import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {editNotes, getFilteredTasks} from '../api'



class EditForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    const previousNotes = this.props.notes || ""

    this.state = {
      show: false,
      notes: previousNotes,
      completedSuccess: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleChange(event){
    let {notes} = this.state
    notes = event.target.value
    this.setState({notes: notes})
  }

  editTaskNotes(id){
    editNotes(id)
    getFilteredTasks(this.props.department).then( filteredTasks => { this.setState({tasks:filteredTasks, completedSuccess: true})
    console.log(this.state.completedSuccess)
   })
  }

  render() {

    return (
      <span>
        <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleShow}>
          Edit Notes
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notes: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              name="notes"
              cols="70"
              rows="10"
              wrap="soft"
              value={this.state.notes}
              onChange={this.handleChange.bind(this)}
            >
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} bsSize="sm">Cancel</Button>
            <Button bsStyle="success" bsSize="sm" onClick={this.editTaskNotes.bind(this, this.props.id)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}

export default EditForm
