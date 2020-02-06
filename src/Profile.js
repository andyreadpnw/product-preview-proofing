import React, { Component } from "react";
import { CSVReader } from "react-papaparse";
import { api } from "./services/api";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      username: null,
      user_group_id: null,
      newUsername: "Select a new Username",
      newPass: "Select a new Password",
      newUserGroupID: "Select the group ID"
    };
  }

  componentDidMount() {
    api.auth.getCurrentUser().then(user => {
      this.setState({
        username: user.user_id.username,
        user_group_id: user.user_id.user_group_id
      });
    });
    console.log(this.state.username);
  }

  handleReadCSV = data => {
    console.log(data.data[1]);
    for (let i = 1; i < data.data.length; i++) {
      let csv_parent_id = data.data[i][0];
      let csv_product_name = data.data[i][1];
      let csv_department = data.data[i][2];
      let csv_style_id = data.data[i][3];
      let csv_color_id = data.data[i][4];
      let csv_product_copy = data.data[i][5];
      let csv_product_main_image = data.data[i][6];
      let csv_fit = data.data[i][7];
      let csv_fabrication = data.data[i][8];
      let csv_style_type = data.data[i][9];
      let csv_product_load_id = data.data[i][10];
      console.log(
        csv_parent_id,
        csv_product_name,
        csv_department,
        csv_style_id,
        csv_color_id,
        csv_product_copy,
        csv_product_main_image,
        csv_fit,
        csv_fabrication,
        csv_style_type,
        csv_product_load_id
      );

      fetch(`https://product-preview-backend.herokuapp.com/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          parent_id: csv_parent_id,
          name: csv_product_name,
          department: csv_department,
          style_id: csv_style_id,
          color_id: csv_color_id,
          product_copy: csv_product_copy,
          product_main_image: csv_product_main_image,
          fit: csv_fit,
          fabrication: csv_fabrication,
          style_type: csv_style_type,
          product_load_id: csv_product_load_id
        })
      }).then(function(resp) {
        if (Math.floor(resp.status / 200) === 1) {
          console.log("successful");
          console.log(resp);
          fetch("https://product-preview-backend.herokuapp.com/products")
            .then(res => res.json())
            .then(json => {
              console.log(json);
              let lastId = Math.max(...json.map(s => s.id));
              let startId = lastId - data.data.length + 2;
              console.log(lastId);
              console.log(startId);
              let totalProducts = lastId - startId + 1;
              for (let t = 0; t <= totalProducts; t++) {
                fetch(
                  `https://product-preview-backend.herokuapp.com/approvals`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json"
                    },
                    body: JSON.stringify({
                      ecomm_approve: "Incomplete",
                      ecomm_approver: "Unassigned",
                      ecomm_comment: "No Comments Yet",
                      plm_approve: "Incomplete",
                      plm_approver: "Unassigned",
                      plm_comment: "No Comments Yet",
                      merchant_approve: "Incomplete",
                      merchant_approver: "Unassigned",
                      merchant_comment: "No Comments Yet",
                      planner_approve: "Incomplete",
                      planner_approver: "Unassigned",
                      planner_comment: "No Comments Yet",
                      other_approve: "Incomplete",
                      other_approver: "Unassigned",
                      other_comment: "No Comments Yet",
                      product_id: startId + t
                    })
                  }
                ).then(function(resp) {
                  if (Math.floor(resp.status / 200) === 1) {
                    console.log("successful");
                  } else {
                    console.log("ERROR", resp);
                  }
                });
              }
            });
        } else {
          console.log("ERROR", resp);
        }
      });
    }
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleImportOffer = () => {
    this.fileInput.current.click();
  };

  handleNewUserSubmit = () => {
    console.log({
      username: this.state.newUsername,
      password: this.state.newPass,
      user_group_id: this.state.newUserGroupID
    });
    fetch(`https://product-preview-backend.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: this.state.newUsername,
        password: this.state.newPass,
        user_group_id: this.state.newUserGroupID
      })
    }).then(resp => {
      if (Math.floor(resp.status / 200) === 1) {
        console.log(resp);
        console.log("successful");
        this.refreshLoginForm();
      } else {
        console.log("ERROR", resp);
      }
    });
  };

  refreshLoginForm = () => {
    this.setState({
      newUsername: "Select a new Username",
      newPass: "Select a new Password",
      newUserGroupID: "Select the group ID"
    });
  };

  updateUsernameValue = e => {
    const newValue = e.target.value;
    this.setState({
      newUsername: newValue
    });
  };

  updateUserGroupValue = e => {
    const newValue = e.target.value;
    this.setState({
      newUserGroupID: newValue
    });
  };

  updatePassValue = e => {
    const newValue = e.target.value;
    this.setState({
      newPass: newValue
    });
  };

  render() {
    let adminToggle = this.state.user_group_id;
    return (
      <div>
        Username: {this.state.username}
        <p></p>
        User Group: {this.state.user_group_id}
        <p></p>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{ display: "none" }}
          onError={this.handleOnError}
        />
        {adminToggle === 1 && <h2>Admin Only Actions:</h2>}
        <p></p>
        {adminToggle === 1 && (
          <button onClick={this.handleImportOffer}>Import New Products</button>
        )}
        <p></p>
        {adminToggle === 1 && <h5>Create a New User:</h5>}
        {adminToggle === 1 && (
          <span>
            User groups to select: Admin(1), Ecomm(2), PLM(3), Merchant(4),
            Planner(5), Other(6)
          </span>
        )}
        {adminToggle === 1 && (
          <input
            type="text"
            className="form-control"
            value={this.state.newUsername}
            name="username"
            placeholder={this.state.newUsername}
            onChange={this.updateUsernameValue}
          />
        )}
        <p></p>
        {adminToggle === 1 && (
          <input
            type="text"
            className="form-control"
            value={this.state.newUserGroupID}
            name="groupID"
            placeholder={this.state.newUserGroupID}
            onChange={this.updateUserGroupValue}
          />
        )}
        <p></p>
        {adminToggle === 1 && (
          <input
            type="text"
            className="form-control"
            value={this.state.newPass}
            name="pass"
            placeholder={this.state.newPass}
            onChange={this.updatePassValue}
          />
        )}
        <p></p>
        {adminToggle === 1 && (
          <button onClick={() => this.handleNewUserSubmit()}>Submit</button>
        )}
      </div>
    );
  }
}

export default Profile;
