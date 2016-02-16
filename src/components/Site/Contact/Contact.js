import _ from 'lodash';
import validator from 'utils/validator';
const msgMandatory = 'Dit veld is verplicht.';
const reducerKey = 'contact';
import React from 'react';
import {connect} from 'react-redux';
import DynamicForm from 'redux-form-generator';
import connectToStore from 'helpers/connectToStore';
import {Row, Col, Alert} from 'react-bootstrap';
import PageHeader from '../Includes/PageHeader';
import {post} from 'redux/modules/store/actions';

@connectToStore('store', reducerKey, 'item')
@connect(state=> {
  const obj = {
    'contact': state.store[reducerKey],
  };
  return obj;
})
class Contact extends React.Component {
  fields() {
    return ([
      {
        name: 'name',
        label: 'Uw naam',
        type: 'text',
        placeholder: 'Uw naam',
        labelClassName: 'col-md-2',
        wrapperClassName: 'col-md-10',
      },
      {
        name: 'email',
        label: 'Uw e-mailadres',
        type: 'text',
        placeholder: 'Uw e-mail',
        labelClassName: 'col-md-2',
        wrapperClassName: 'col-md-10',
      },
      {
        name: 'message',
        label: 'Bericht',
        type: 'textarea',
        rows: 15,
        placeholder: 'Uw bericht',
        labelClassName: 'col-md-2',
        wrapperClassName: 'col-md-10',
      },
      {
        row: {
          col: [
            {
              md: 12,
              children: [
                {type: 'error', message: 'Er zijn fouten opgetreden, controleer het formulier.'},
              ]
            },
            {hideOnStatic: true, md: 12, children: [{type: 'submit', name: 'submit', value: 'Vertuur'}]}
          ]
        }
      }
    ]);
  }

  validator(data) {
    const errors = {};
    if (!data.message || validator.isNull(data.message)) errors.message = msgMandatory;
    if (!data.name || validator.isNull(data.name)) errors.name = msgMandatory;
    if (!data.email || validator.isNull(data.email) || !validator.isEmail(data.email)) errors.email = msgMandatory;
    return errors;
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(post(reducerKey, '/contact', values))
        .then((ret)=> {
          if (ret.hasOwnProperty('error')) {
            reject(ret.error);
          } else {
            resolve();
          }
        });
    });
  }

  render() {
    const form = () => {
      if (_.get(this.props, ['contact', 'item', 'success'], false) === true) {
        return (<Alert bsStyle="success">Uw bericht is verzonden, we nemen zo spoedig mogelijk contact met u op.</Alert>);
      }


      return (<DynamicForm
        checkKey={'contact' + _.get(this.props, ['contact', 'item', 'success'], false)}
        formName="contact"
        fieldsNeeded={this.fields()}
        static={_.get(this.props, ['contact', 'item', 'success'], false)}
        validate={this.validator}
        onSubmit={this.handleSubmit}
        getActionState={this.props.getActionState}
        clearActionState={this.props.clearActionState}
        />);
    };

    return (
      <div>
        <PageHeader
          title="Contact"
          desc="Heeft u een vraag, stel hem ons"
          links={[
            {to: '/', name: 'Home'},
            {name: 'Contact'}
          ]}
        />

        <div className="container">
          <Row>
            <Col md={12}>
              <div className="form-wrapper">
                <h2 className="title-underblock custom mb40">Contact opnemen</h2>
                {form()}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  'getActionState': React.PropTypes.func,
  'clearActionState': React.PropTypes.func
};
Contact.defaultProps = {};

export default Contact;
