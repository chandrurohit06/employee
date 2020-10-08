import React, { Component } from "react";
import { Modal } from "reactstrap";
import { Form, FormGroup, Button, FormControl, } from "react-bootstrap";
class Model extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modal_center}
        toggle={this.props.isClose}
        check={this.props.requireitem}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0">{this.props.title}</h5>
          <button type="button" onClick={this.props.isClose} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <Form>
            <FormGroup>
              <FormControl
                type="text"
                name="id"
                placeholder="id"
                disabled
                value={this.props.requireditem.id}
                onChange={this.props.modelChange}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                name="name"
                placeholder="name"
                value={this.props.requireditem.name}
                onChange={this.props.modelChange}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <FormControl
                type="text"
                name="email"
                placeholder="email-id"
                value={this.props.requireditem.email}
                onChange={this.props.modelChange}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <FormControl
                type="text"
                name="location"
                placeholder="location"
                value={this.props.requireditem.location}
                onChange={this.props.modelChange}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <FormControl
                type="text"
                name="mobile"
                placeholder="phone"
                onChange={this.props.modelChange}
                value={this.props.requireditem.mobile}
              ></FormControl>
            </FormGroup>
            <Button type="submit" onClick={this.props.updateemp}>
              Update
            </Button>
          </Form>
        </div>
      </Modal>
    );
    // };
  }
}
export default Model;
