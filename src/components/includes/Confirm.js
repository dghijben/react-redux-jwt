import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class Confirm extends Component {

  static propTypes = {
    showModal: PropTypes.bool,
    close: PropTypes.func.isRequired,
    confirmed: PropTypes.func.isRequired,
    item: PropTypes.object
  }

  render() {

    const confirmed = () => {
      this.props.confirmed(_.get(this.props, 'item', {}));
    };

    return (
      <Modal show={this.props.showModal} onHide={()=>{this.props.close();}}>
        <Modal.Header>
          <Modal.Title>Verwijderen</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {_.get(this.props, 'children', 'Bevestig uw actie.')}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.close}>sluiten</Button>
          <Button onClick={confirmed} bsStyle="primary">verwijderen</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
