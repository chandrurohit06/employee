import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Model from "./model/editmodel";

import Formtable from "./table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showalert: true,
      modals: {
        editModal: false,
        modal_center: false,
      },
      update: false,
      visible: true,
      click: false,
      requiredItem: {},
      tableVisible: true,
    };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.modelChange = this.modelChange.bind(this);
  }




  modelChange = (event) => {
    this.setState({
      requiredItem: {
        ...this.state.requiredItem,
        [event.target.name]: event.target.value,
      },
    });
  };

  async updateClicked(rec) {
    console.log(rec);
    await this.setState({
      modals: {
        modal_center: true,
        editModal: true,
        title: "Modify Table",
      },
      requiredItem: rec,

    });

    // console.log(this.state.requiredItem);
  }

  // updating data to database

  updateEmployee = (e) => {
    e.preventDefault();
    console.log(this.state.requiredItem);
    this.setState({ tableVisible: false })
    var headers = new Headers();
    headers.append("content-type", "application/json");
    var body = JSON.stringify({
      emp_name: this.state.requiredItem.name,
      emp_email: this.state.requiredItem.email,
      emp_location: this.state.requiredItem.location,
      emp_mobile: this.state.requiredItem.mobile,
    });

    fetch(`http://localhost:4000/api/emp/${this.state.requiredItem.id}`, {
      method: "PUT",
      headers: headers,
      body: body,
    })
      .then((response) => response.text())

      .then(async (result) => {
        await this.setState({
          showalert: true,
          id: "",
          name: "",
          email: "",
          location: "",
          phone: "",
          update: false,
          modals: { ...this.state.modals, modal_center: false },
          tableVisible: true
        });
        this.viewEmployee();
      })

      .catch((err) => {
        console.log("err", err);
      });
  };


  //search bar
  async searchEmployee() {
    let findSearch = await this.state.records.filter(
      (e) => e.name === this.state.search
    );
    // console.log(findSearch, this.state.search);
    if (findSearch.length === 0) {
      return null;
    } else {
      // console.log(this.state.stored);
      this.setState({
        stored: findSearch,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          <div className="container-fuild">
            <Model
              modal_center={this.state.modals.modal_center}
              isClose={() =>
                this.setState({
                  modals: { ...this.state.modals, modal_center: false },
                })
              }
              title={this.state.modals.title}
              updateemp={this.updateEmployee}
              requireditem={this.state.requiredItem}
              modelChange={this.modelChange}
            />

            <Container className="container-fuild">
              {this.state.tableVisible ? <Formtable
                deleterec={() => {
                  this.setState({ deleteRecord: [] });
                }}
                stored={this.state.stored}
                deleteRecord={this.deleteRecord}
                updateClicked={this.updateClicked}
              /> : "Loading Please Wait"}
            </Container>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default App;
