import React, { Component } from "react";
import { Row, FormControl, Col } from "react-bootstrap";

class Searchbox extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="m-5">
        <Row>
          <Col sm={10}>
            <FormControl
              type="text"
              name="search"
              placeholder="search employeess"
              value={this.props.searchvalue}
              onChange={this.props.searchValueChange}
            ></FormControl>
          </Col>
          <Col sm={1}>
            <button className="btn btn-primary" onClick={this.props.onSearch}>
              search
            </button>
          </Col>
          <Col sm={1}>
            <button className="btn btn-primary" onClick={this.props.clearvalue}>
              clear
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Searchbox;
