import React, { Component } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-awesome-modal";
import "./style.css";

export class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editVisible: false,
      logSelected: 1,
      status: "none",
      priority: "none",
      issue_type: "none",
      issue_class: "none",
      site: "none",
      division: "none",
      environment: "none",
      log_body: "none",
      assigned: "none",
      cc: "none",
      due_date: "none",
      data: this.props.data
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  deleteTicket(id) {
    this.setState({
      visible: false
    });
    fetch("http://product-preview-backend.herokuapp.com/product_logs/" + id, {
      method: "delete"
    })
      .then(resp => {
        this.props.updateProductTickets();
      })
      .then(json => console.log(json.message))
      .catch(err => {
        console.error(err);
      });
    console.log("Deleted Log");
    this.closeEditModal();
  }

  closeEditModal() {
    this.setState({
      editVisible: false
    });
  }

  handleNewTicket() {
    this.setState({
      editVisible: true,
      logSelected: 0,
      status: "none",
      priority: "none",
      issue_type: "none",
      issue_class: "none",
      site: "none",
      division: "none",
      environment: "none",
      log_body: "none",
      assigned: "none",
      cc: "none",
      due_date: "none"
    });
  }

  openEditModal() {
    this.setState({
      visible: false,
      editVisible: true
    });
  }

  updateLogBodyValue = e => {
    const newValue = e.target.value;
    this.setState({
      log_body: newValue
    });
  };

  updateDivisionValue = e => {
    const newValue = e.target.value;
    this.setState({
      division: newValue
    });
  };

  updateSiteValue = e => {
    const newValue = e.target.value;
    this.setState({
      site: newValue
    });
  };

  updateIssueClassValue = e => {
    const newValue = e.target.value;
    this.setState({
      issue_class: newValue
    });
  };

  updateIssueTypeValue = e => {
    const newValue = e.target.value;
    this.setState({
      issue_type: newValue
    });
  };

  updateIssueClassValue = e => {
    const newValue = e.target.value;
    this.setState({
      issue_class: newValue
    });
  };

  updateIssueClassValue = e => {
    const newValue = e.target.value;
    this.setState({
      issue_class: newValue
    });
  };

  updateEnvironmentValue = e => {
    const newValue = e.target.value;
    this.setState({
      environment: newValue
    });
  };

  updateStatusValue = e => {
    const newValue = e.target.value;
    this.setState({
      status: newValue
    });
  };

  updatePriorityValue = e => {
    const newValue = e.target.value;
    this.setState({
      priority: newValue
    });
  };

  updateAssignedValue = e => {
    const newValue = e.target.value;
    this.setState({
      assigned: newValue
    });
  };

  updateCCValue = e => {
    const newValue = e.target.value;
    this.setState({
      cc: newValue
    });
  };

  updateDueDateValue = e => {
    const newValue = e.target.value;
    this.setState({
      due_date: newValue
    });
  };

  handleRowClicked = row => {
    this.setState({
      logSelected: row.id,
      status: row.status,
      priority: row.priority,
      issue_type: row.issue_type,
      issue_class: row.issue_class,
      site: row.site,
      division: row.division,
      environment: row.environment,
      log_body: row.log_body,
      assigned: row.assigned,
      cc: row.cc,
      due_date: row.due_date
    });
    this.openModal();
  };

  submitLog = id => {
    if (this.state.logSelected !== 0) {
      fetch("http://product-preview-backend.herokuapp.com/product_logs/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          status: this.state.status,
          priority: this.state.priority,
          issue_type: this.state.issue_type,
          issue_class: this.state.issue_class,
          site: this.state.site,
          division: this.state.division,
          environment: this.state.environment,
          log_body: this.state.log_body,
          assigned: this.state.assigned,
          cc: this.state.cc,
          due_date: this.state.due_date
        })
      }).then(resp => {
        if (Math.floor(resp.status / 200) === 1) {
          this.props.updateProductTickets();
          this.closeEditModal();
          console.log("Edited log successfully");
        } else {
          console.log("ERROR", resp);
        }
      });
    } else {
      fetch("http://product-preview-backend.herokuapp.com/product_logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          status: this.state.status,
          priority: this.state.priority,
          issue_type: this.state.issue_type,
          issue_class: this.state.issue_class,
          site: this.state.site,
          division: this.state.division,
          environment: this.state.environment,
          log_body: this.state.log_body,
          assigned: this.state.assigned,
          cc: this.state.cc,
          due_date: this.state.due_date,
          color_id: this.props.product[0].color_id,
          department: this.props.product[0].department,
          fabrication: this.props.product[0].fabrication,
          fit: this.props.product[0].fit,
          name: this.props.product[0].name,
          parent_id: this.props.product[0].parent_id,
          product_copy: this.props.product[0].product_copy,
          product_id: this.props.product[0].id,
          style_id: this.props.product[0].style_id
        })
      }).then(resp => {
        if (Math.floor(resp.status / 200) === 1) {
          console.log("New Product Log submitted");
          this.props.updateProductTickets();
          this.closeEditModal();
        } else {
          console.log("ERROR", resp);
        }
      });
    }
  };

  render() {
    const data = this.state.data;

    const columns = [
      {
        name: "ID",
        selector: "id",
        sortable: true,
        width: "45px"
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        right: true,
        width: "90px"
      },
      {
        name: "Priority",
        selector: "priority",
        sortable: true,
        right: true,
        width: "90px"
      },
      {
        name: "Issue Type",
        selector: "issue_type",
        sortable: true,
        right: true,
        width: "120px"
      },
      {
        name: "Issue Class",
        selector: "issue_class",
        sortable: true,
        right: true,
        width: "140px"
      },
      {
        name: "Site",
        selector: "site",
        sortable: true,
        right: true,
        width: "90px"
      },
      {
        name: "Division",
        selector: "division",
        sortable: true,
        right: true,
        width: "90px"
      },
      {
        name: "Environment",
        selector: "environment",
        sortable: true,
        right: true,
        width: "90px"
      },
      {
        name: "Action Request",
        selector: "log_body",
        sortable: true,
        right: true,
        grow: 120
      },
      {
        name: "Assigned",
        selector: "assigned",
        sortable: true,
        right: true,
        width: "120px"
      },
      {
        name: "CC",
        selector: "cc",
        sortable: true,
        right: true
      },
      {
        name: "Date Prediction",
        selector: "date_due",
        sortable: true,
        right: true
      }
    ];

    return (
      <div>
        <DataTable
          title="Product Logs"
          columns={columns}
          data={data}
          onRowClicked={this.handleRowClicked}
          onClick={this.handleClick}
          pagination
        />
        <Modal
          visible={this.state.visible}
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div id="tickets-edit">
            <h1>{this.props.product[0].name}</h1>
            <p>ID: {this.state.logSelected}</p>
            <p>Status: {this.state.status}</p>
            <p>Priority: {this.state.priority}</p>
            <p>Issue Class: {this.state.issue_class}</p>
            <p>Issue Type: {this.state.issue_type}</p>
            <p>Site: {this.state.site}</p>
            <p>Division: {this.state.division}</p>
            <p>Environment: {this.state.environment}</p>
            <p>Action Requested: {this.state.log_body}</p>
            <p>Assigned: {this.state.assigned}</p>
            <p>CC: {this.state.cc}</p>
            <p>Date Requested: {this.state.due_date}</p>
            <a href="javascript:void(0);" onClick={() => this.openEditModal()}>
              Edit
            </a>
            <br></br>
            <a href="javascript:void(0);" onClick={() => this.closeModal()}>
              Close
            </a>
            <br></br>
            <a
              href="javascript:void(0);"
              onClick={() => this.deleteTicket(this.state.logSelected)}
            >
              Delete
            </a>
          </div>
        </Modal>
        <Modal
          visible={this.state.editVisible}
          effect="fadeInUp"
          onClickAway={() => this.closeEditModal()}
        >
          <div id="tickets-edit">
            <h1>Log ID:{this.state.logSelected}</h1>
            Status:
            <select value={this.state.status} onChange={this.updateStatusValue}>
              <option value="none">Select</option>
              <option value="Active">Active</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <p></p>
            Priority:
            <select
              value={this.state.priority}
              onChange={this.updatePriorityValue}
            >
              <option value="none">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            <p></p>
            Issue Class:
            <select
              value={this.state.issue_type}
              onChange={this.updateIssueTypeValue}
            >
              <option value="none">Select</option>
              <option value="Product Data">Product Data</option>
              <option value="Image Issue">Image Issue</option>
              <option value="Incorrect Load">Incorrect Load</option>
              <option value="Copy">Copy</option>
            </select>
            <p></p>
            Issue Type:
            <select
              value={this.state.issue_class}
              onChange={this.updateIssueClassValue}
            >
              <option value="none">Select</option>
              <option value="Prevent Load until Fixed">
                Prevent Load until Fixed
              </option>
              <option value="Load but Correct ASAP">Incorrect Load</option>
            </select>
            <p></p>
            Site:
            <select value={this.state.site} onChange={this.updateSiteValue}>
              <option value="none">Select</option>
              <option value="US Site">US Site</option>
              <option value="CA Site">CA Site</option>
            </select>
            <p></p>
            Division:
            <select
              value={this.state.division}
              onChange={this.updateDivisionValue}
            >
              <option value="none">Select</option>
              <option value="Ecomm">Ecomm</option>
              <option value="Planner">Planner</option>
              <option value="Merchant">Merchant</option>
              <option value="PLM">Planner</option>
            </select>
            <p></p>
            Environment:
            <select
              value={this.state.environment}
              onChange={this.updateEnvironmentValue}
            >
              <option value="none">Select</option>
              <option value="Proofing">Proofing</option>
              <option value="Product Live">Product Live</option>
            </select>
            <p></p>
            Request:
            <input
              type="text"
              className="form-control"
              value={this.state.log_body}
              name="logBody"
              placeholder={this.state.log_body}
              onChange={this.updateLogBodyValue}
            />
            <p></p>
            Assigned:
            <select
              value={this.state.assigned}
              onChange={this.updateAssignedValue}
            >
              <option value="none">Select</option>
              <option value="Select">Andy Read</option>
              <option value="Andy Read">Andy Read</option>
            </select>
            <p></p>
            CC:
            <select value={this.state.cc} onChange={this.updateCCValue}>
              <option value="none">Select</option>
              <option value="Select">Andy Read</option>
              <option value="Andy Read">Andy Read</option>
            </select>
            <p></p>
            Due Date:
            <input
              type="text"
              className="form-control"
              value={this.state.due_date}
              name="due_date"
              placeholder={this.state.due_date}
              onChange={this.updateDueDateValue}
            />
            <p></p>
            <button onClick={() => this.submitLog(this.state.logSelected)}>
              Submit
            </button>
            <p></p>
            <a href="javascript:void(0);" onClick={() => this.closeEditModal()}>
              Close
            </a>
          </div>
        </Modal>
        <input
          type="button"
          value="Log a New Ticket"
          onClick={() => this.handleNewTicket()}
        />
      </div>
    );
  }
}

export default Ticket;
