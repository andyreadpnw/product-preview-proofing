import React, { Component } from "react";
import { Table } from "reactstrap";

export class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ecomm_approve: this.props.ecomm_approve,
      ecomm_approver: this.props.ecomm_approver,
      ecomm_comment: this.props.ecomm_comment,
      plm_approve: this.props.plm_approve,
      plm_approver: this.props.plm_approver,
      plm_comment: this.props.plm_comment,
      merchant_approve: this.props.merchant_approve,
      merchant_approver: this.props.merchant_approver,
      merchant_comment: this.props.merchant_comment,
      planner_approve: this.props.planner_approve,
      planner_approver: this.props.planner_approver,
      planner_comment: this.props.planner_comment,
      other_approve: this.props.other_approve,
      other_approver: this.props.other_approver,
      other_comment: this.props.other_comment
    };
  }

  updateApprovalValue = e => {
    const newValue = e.target.value;
    let userGroupApprovalSelect = this.props.currentUser.user_id.user_group_id;
    let userGroupApprovalName = "ecomm";
    switch (userGroupApprovalSelect) {
      case 1:
        userGroupApprovalName = "ecomm";
        this.setState({
          ecomm_approver: this.props.currentUser.user_id.username,
          ecomm_approve: newValue
        });
        break;
      case 2:
        userGroupApprovalName = "ecomm";
        this.setState({
          ecomm_approver: this.props.currentUser.user_id.username,
          ecomm_approve: newValue
        });
        break;
      case 3:
        userGroupApprovalName = "plm";
        this.setState({
          plm_approver: this.props.currentUser.user_id.username,
          plm_approve: newValue
        });
        break;
      case 4:
        userGroupApprovalName = "merchant";
        this.setState({
          merchant_approver: this.props.currentUser.user_id.username,
          merchant_approve: newValue
        });
        break;
      case 5:
        userGroupApprovalName = "planner";
        this.setState({
          planner_approver: this.props.currentUser.user_id.username,
          planner_approve: newValue
        });
        break;
      case 6:
        userGroupApprovalName = "other";
        this.setState({
          other_approver: this.props.currentUser.user_id.username,
          other_approve: newValue
        });
        break;
    }
  };

  updateCommentValue = e => {
    const newValue = e.target.value;
    let userGroupCommentSelect = this.props.currentUser.user_id.user_group_id;
    let userGroupCommentName = "ecomm";
    switch (userGroupCommentSelect) {
      case 1:
        userGroupCommentName = "ecomm";
        this.setState({
          ecomm_approver: this.props.currentUser.user_id.username,
          ecomm_comment: newValue
        });
        break;
      case 2:
        userGroupCommentName = "ecomm";
        this.setState({
          ecomm_approver: this.props.currentUser.user_id.username,
          ecomm_comment: newValue
        });
        break;
      case 3:
        userGroupCommentName = "plm";
        this.setState({
          plm_approver: this.props.currentUser.user_id.username,
          plm_comment: newValue
        });
        break;
      case 4:
        userGroupCommentName = "merchant";
        this.setState({
          merchant_approver: this.props.currentUser.user_id.username,
          merchant_comment: newValue
        });
        break;
      case 5:
        userGroupCommentName = "planner";
        this.setState({
          planner_approver: this.props.currentUser.user_id.username,
          planner_comment: newValue
        });
        break;
      case 6:
        userGroupCommentName = "other";
        this.setState({
          other_approver: this.props.currentUser.user_id.username,
          other_comment: newValue
        });
        break;
    }
  };

  submitApproval = id => {
    console.log(id);
    console.log(this.props.currentUser.user_id.user_group_id);
    let userGroupSelect = this.props.currentUser.user_id.user_group_id;
    let userGroupName = "ecomm";
    switch (userGroupSelect) {
      case 1:
        userGroupName = "ecomm";
        this.setState({
          ecomm_approve: this.state.ecomm_approve,
          ecomm_approver: this.state.ecomm_approver,
          ecomm_comment: this.state.ecomm_comment
        });
        break;
      case 2:
        userGroupName = "ecomm";
        this.setState({
          ecomm_approve: this.state.ecomm_approve,
          ecomm_approver: this.state.ecomm_approver,
          ecomm_comment: this.state.ecomm_comment
        });
        break;
      case 3:
        userGroupName = "plm";
        this.setState({
          plm_approve: this.state.ecomm_approve,
          plm_approver: this.state.ecomm_approver,
          plm_comment: this.state.ecomm_comment
        });
        break;
      case 4:
        userGroupName = "merchant";
        this.setState({
          merchant_approve: this.state.ecomm_approve,
          merchant_approver: this.state.ecomm_approver,
          merchant_comment: this.state.ecomm_comment
        });
        break;
      case 5:
        userGroupName = "planner";
        this.setState({
          planner_approve: this.state.ecomm_approve,
          planner_approver: this.state.ecomm_approver,
          planner_comment: this.state.ecomm_comment
        });
        break;
      case 6:
        userGroupName = "other";
        this.setState({
          other_approve: this.state.ecomm_approve,
          other_approver: this.state.ecomm_approver,
          other_comment: this.state.ecomm_comment
        });
        break;
    }
    let approveName = userGroupName + "_approve";
    let approverName = userGroupName + "_approver";
    let commentName = userGroupName + "_comment";
    console.log(approveName);
    console.log(approverName);
    console.log(commentName);

    fetch("https://product-preview-backend.herokuapp.com/approvals/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ecomm_approve: this.state.ecomm_approve,
        ecomm_approver: this.state.ecomm_approver,
        ecomm_comment: this.state.ecomm_comment,
        plm_approve: this.state.plm_approve,
        plm_approver: this.state.plm_approver,
        plm_comment: this.state.plm_comment,
        merchant_approve: this.state.merchant_approve,
        merchant_approver: this.state.merchant_approver,
        merchant_comment: this.state.merchant_comment,
        planner_approve: this.state.planner_approve,
        planner_approver: this.state.planner_approver,
        planner_comment: this.state.planner_comment,
        other_approve: this.state.other_approve,
        other_approver: this.state.other_approver,
        other_comment: this.state.other_comment
      })
    }).then(resp => {
      if (Math.floor(resp.status / 200) === 1) {
        this.props.updateApprovals();
        console.log("Edited log successfully");
      } else {
        console.log("ERROR", resp);
      }
    });
  };

  render() {
    let {
      parent_id,
      name,
      department,
      style_id,
      color_id,
      product_copy,
      product_main_image,
      fit,
      fabrication,
      style_type
    } = this.props.product;
    let {
      id,
      ecomm_approve,
      ecomm_approver,
      ecomm_comment,
      plm_approve,
      plm_approver,
      plm_comment,
      merchant_approve,
      merchant_approver,
      merchant_comment,
      planner_approve,
      planner_approver,
      planner_comment,
      other_approve,
      other_approver,
      other_comment
    } = this.props.approvals[0];
    console.log(this.props.approvals);
    return (
      <div>
        <header>
          <hgroup>
            <h1>{name}</h1>
            <h4>Product ID: {parent_id}</h4>
            <img src={product_main_image}></img>
          </hgroup>
        </header>

        <div class="grid-container">
          <div class="grid-item">
            <section>
              <h5>Summary Copy: {product_copy}</h5>
              <li>Department: {department}</li>
              <li>Style ID: {style_id}</li>
              <li>Color ID: {color_id}</li>
              <li>Size Type: {style_type}</li>

              <details>
                <summary>Product Features</summary>
                <ul>
                  <li>Fit: {fit}</li>
                  <li>Fabrication: {fabrication}</li>
                </ul>
              </details>
            </section>
          </div>
          <div class="grid-item2">
            <Table striped>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Approve</th>
                  <th>Approver</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Ecomm</th>
                  <td>{ecomm_approve}</td>
                  <td>{ecomm_approver}</td>
                  <td>{ecomm_comment}</td>
                </tr>
                <tr>
                  <th scope="row">PLM</th>
                  <td>{plm_approve}</td>
                  <td>{plm_approver}</td>
                  <td>{plm_comment}</td>
                </tr>
                <tr>
                  <th scope="row">Merchant</th>
                  <td>{merchant_approve}</td>
                  <td>{merchant_approver}</td>
                  <td>{merchant_comment}</td>
                </tr>
                <tr>
                  <th scope="row">Planner</th>
                  <td>{planner_approve}</td>
                  <td>{planner_approver}</td>
                  <td>{planner_comment}</td>
                </tr>
                <tr>
                  <th scope="row">Other</th>
                  <td>{other_approve}</td>
                  <td>{other_approver}</td>
                  <td>{other_comment}</td>
                </tr>
              </tbody>
            </Table>
            Status:
            <select
              value={this.state.approval}
              onChange={this.updateApprovalValue}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Approved">Approved</option>
            </select>
            <br></br>
            Approver Comment:
            <input
              type="text"
              className="form-control"
              value={this.state.comment}
              name="comment"
              placeholder={this.state.comment}
              onChange={this.updateCommentValue}
            />
            <button onClick={() => this.submitApproval(id)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PDP;
