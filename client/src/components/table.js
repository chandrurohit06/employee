import React, { Component } from "react";
import { Row, Form, FormGroup, FormLabel, Button, FormControl, Table, Col } from "react-bootstrap";
import Searchbox from "./searchbox";
import { CSVLink } from "react-csv";
import xlsx from "xlsx";


class Formtable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      location: "",
      phone: "",
      records: [],
      search: [],
      stored: [],
      deleterecord: [],
      searchValue: ""
    };
    this.addEmpolyee = this.addEmpolyee.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this);
  }

  async componentDidMount() {
    await this.viewEmployee();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  exportExcel = async () => {
    const ws = xlsx.utils.json_to_sheet(this.state.records);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "SheetJS");
    xlsx.writeFile(wb, "empolyee.xlsx");
  }

  addEmpolyee(e) {
    e.preventDefault();
    //     // console.log("hloo");
    var myheaders = new Headers();
    myheaders.append("content-Type", "application/json");
    var body = JSON.stringify({
      emp_name: this.state.name,
      emp_email: this.state.email,
      emp_location: this.state.location,
      emp_mobile: this.state.phone,
    });
    // console.log(body);
    fetch("http://localhost:4000/api/emp", {
      method: "POST",
      headers: myheaders,
      body: body,
    })
      .then((response) => response.text())
      .then((result) => {
        this.setState({
          name: "",
          email: "",
          location: "",
          phone: "",
        });
        this.viewEmployee();
        this.form.reset();
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  viewEmployee = () => {
    var headers = new Headers();
    // console.log("hiii");
    headers.append("content-Type", "application/json");
    fetch("http://localhost:4000/api/emp", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then(async (result) => {
        await this.setState({
          records: result,
        });
      })
      .catch((error) => console.log("errror", error));
  };


  async deleteRecord(rec) {
    console.log(rec);
    console.log(this.state.deleterecord);
    const isvalidRec = await this.state.deleterecord.find(
      (e) => e.id === rec.id
    );
    if (isvalidRec) {
      const updatedrecords = await this.state.deleterecord.filter(
        (del) => del.id !== rec.id
      );
      this.setState({
        deleterecord: updatedrecords,
      });
    } else {
      await this.setState({
        deleterecord: [...this.state.deleterecord, rec],
      });
    }
    console.log(this.state.deleterecord);
  }


  deleterFromServer = () => {
    console.log("hii");
    // console.log(this.state.deleterecord);

    var myheaders = new Headers();
    myheaders.append("content-Type", "application/json");
    var body = JSON.stringify({
      emp: this.state.deleterecord,
    });
    fetch("http://localhost:4000/api/emp/delete", {
      method: "POST",
      body: body,
      headers: myheaders,
    })
      .then((response) => response.text())
      .then(async (result) => {
        console.log(result.data);
        this.setState({
          deleterecord: [],
        });
        await this.viewEmployee();
      })
      .catch((error) => console.log("error", error));
  };




  onSearchValueChange = (event) => {
    // console.log(this.state.search);

    this.setState({
      search: event.target.value,
    });
  };


  searchEmployee = async () => {
    // event.preventDefault();
    // console.log("chnd");
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
      <>
        <Searchbox
          searchValueChange={this.onSearchValueChange}
          searchValue={this.state.searchValue}
          clearvalue={() => this.setState({ stored: [] })}
          onSearch={this.searchEmployee}
        />
        <div>
          <Row>
            <Col sm={4}>
              <Row>
                <Form onSubmit={this.addEmpolyee} ref={(c) => (this.form = c)}>
                  <FormGroup>
                    <FormLabel>
                      <span>Add Employee</span>
                    </FormLabel>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={this.handleChange}
                      value={this.state.name}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormControl
                      type="text"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormControl
                      type="text"
                      name="location"
                      placeholder="location"
                      onChange={this.handleChange}
                      value={this.state.location}
                    ></FormControl>
                  </FormGroup>

                  <FormGroup>
                    <FormControl
                      type="text"
                      name="phone"
                      placeholder="phoneNo"
                      onChange={this.handleChange}
                      value={this.state.phone}
                    ></FormControl>
                  </FormGroup>

                  <Row>
                    <Button type="submit">save</Button>
                  </Row>
                </Form>
              </Row>
              <Row className="m-2">
                {this.state.records.length !== 0 && (
                  <Row className="p-1">
                    <p className="text-primary text-uppercase">
                      Download Employee Data option
                  </p>
                    <div>
                      {/* expoting csv file */}
                      <CSVLink
                        data={this.state.records}
                        filename={"employee.csv"}
                        className=" btn btn-success mr-1"
                      >
                        Download as csv
                    </CSVLink>
                      {/* expoting xlsx file */}
                      <Button
                        type="button"
                        color="success"
                        onClick={() => this.exportExcel()}
                      >
                        Download as xlsx
                    </Button>
                    </div>
                  </Row>
                )}
              </Row>
            </Col>
            <Col sm={8}>
              {this.state.deleterecord.length !== 0 && (
                <Row>
                  <Row className="m-1">
                    <p className="text-danger">Conform to Delete</p>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        onClick={() => this.deleterFromServer()}
                        variant="btn btn-primary"
                      >
                        YES
                    </Button>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => this.props.deleterec}
                        variant="btn btn-danger"
                      >
                        NO
                    </Button>
                    </Col>
                  </Row>
                </Row>
              )}
              {this.state.records.length <= 0 ? (
                "Loading...Please Wait "
              ) : (
                  <Row className="m-5">
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>-</th>
                          <th>Id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Location</th>
                          <th> Phone</th>
                          <th> Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.stored.length === 0
                          ? this.state.records.map((rec) => {
                            return (
                              <tr key={rec.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    onChange={() => this.deleteRecord(rec)}
                                  />
                                </td>
                                <td>{rec.id}</td>
                                <td>{rec.name}</td>
                                <td>{rec.email}</td>
                                <td>{rec.location}</td>
                                <td>{rec.mobile}</td>
                                <td>
                                  <Button
                                    onClick={() => this.props.updateClicked(rec)}
                                    className="btn btn-primary"
                                  >
                                    Edit
                                </Button>
                                </td>
                              </tr>
                            );
                          })
                          : this.state.stored.map((rec) => {
                            return (
                              <tr key={rec.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    onChange={() => this.deleteRecord(rec)}
                                  />
                                </td>
                                <td>{rec.id}</td>
                                <td>{rec.name}</td>
                                <td>{rec.email}</td>
                                <td>{rec.location}</td>
                                <td>{rec.mobile}</td>
                                <td>
                                  <Button
                                    onClick={() => this.props.updateClicked(rec)}
                                    className="btn btn-primary"
                                  >
                                    Edit
                                </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Row>
                )}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Formtable;
