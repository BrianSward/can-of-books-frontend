import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class BookFormModal extends React.Component {
  
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Form onSubmit={this.props.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="name" placeholder="Enter book title..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder="Describe this book..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Have you read this book?" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.props.close}>Submit</Button>
        </Form>
      </Modal>
    )
  }
}

export default BookFormModal;