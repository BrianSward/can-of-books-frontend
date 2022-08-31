import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UpdateForm extends React.Component {
  
  render() {
    console.log(this.props);
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Form onSubmit={ (e)=> this.props.handleUpdate(e)}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="name" placeholder={this.props.book.title}  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder={this.props.book.description}  />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Have you read this book?" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.props.close}>Update</Button>
        </Form>
      </Modal>
    )
  }
}

export default UpdateForm;