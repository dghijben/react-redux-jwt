import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Confirm extends Component {

  static propTypes = {
    showModal: PropTypes.bool,
    close: PropTypes.func.isRequired,
    confirmed: PropTypes.func.isRequired
  }

  render() {
    console.log(this.props);

    return (
      <Modal show={this.props.showModal} onHide={()=>{this.props.close();}}>
        <Modal.Header>
          <Modal.Title>Verwijderen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          One fine body...
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.close}>sluiten</Button>
          <Button onClick={this.props.confirmed} bsStyle="primary">verwijderen</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
