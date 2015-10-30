import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import {Alert, Row, Col, DropdownButton, MenuItem, Input, Button} from 'react-bootstrap';
import {updateField} from 'redux/modules/reduxForm/actions';
import {Pending} from 'components/includes';

class BaseForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    formKey: PropTypes.string.isRequired,
    formClass: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    getActionState: PropTypes.func.isRequired,
    success: PropTypes.bool
  };

  constructor() {
    super();
    this.addField = this.addField.bind(this);
    this.dropDownSelect = this.dropDownSelect.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.input = this.input.bind(this);
    this.row = this.row.bind(this);
    this.col = this.col.bind(this);
    this.state = {
      dropDownTitle: {},
      hidden: []
    };
  }

  dropDownSelect(name, item) {
    this.setState(_.set(Object.assign({}, this.state), ['dropDownTitle', name], item.desc || item.default));

    return new Promise((resolve) => {
      resolve(this.props.dispatch(updateField(name, item.field, _.get(this.props, 'formKey', null))));
    }).then(()=>{ this.refs.button.click(); });

    // Promise.resolve(this.props.dispatch(updateField(name, item.field, _.get(this.props, 'formKey', null))));
    // .then(this.refs.button.click());
  }

  dropDown(field: Object, size: string) {

    const menuItem = [];
    let dropDownTitle = null;
    _.map(field.items, (item, key) => {
      const select = () => { this.dropDownSelect(field.name, item); };

      if (item.hasOwnProperty('default')) {
        dropDownTitle = item.default;
        menuItem.push( <MenuItem key={key} onSelect={select}>{item.default}</MenuItem>);
        menuItem.push( <MenuItem key={key + '_div'} divider/>);
      } else {
        if (_.get(this.props, ['fields', field.name, 'defaultValue']) === item.field) {
          dropDownTitle = item.desc;
        }
        menuItem.push( <MenuItem key={key} onSelect={select}>{item.desc}</MenuItem>);
      }
    });

    if (menuItem.length > 0) {
      return (
        <DropdownButton bsSize={_.get(field, 'bsSize', size)} bsStyle={_.get(field, 'style', 'primary')} title={_.get(this.state, ['dropDownTitle', field.name]) || dropDownTitle} id="input-dropdown-addon">
          {menuItem}
        </DropdownButton>
      );
    }
  }

  input(field: Object, size: string) {
    const props = this.props.fields[field.name];
    const extraProps = {};
    if (props.touched && props.error) {
      extraProps.bsStyle = 'error';
    }
    if (props.touched && props.error) {
      extraProps.help = props.error;
    }
    return (
      <Input
        key={field.name}
        name="search"
        bsSize={size}
        {...extraProps}
        {...field}
        {...props}
        buttonBefore={this.addField(_.get(field, 'buttonBefore', {}), size)}
        buttonAfter={this.addField(_.get(field, 'buttonAfter', {}), size)}
      />
    );
  }

  row(field, key, size) {
    return (
      <Row key={key}>
        {_.map(field, (row)=>{
          return this.col(row.col, size);
        })}
      </Row>
    );
  }

  col(cols, size) {

    return _.map(cols, (col, key)=>{
      return (
        <Col key={key} {..._.omit(col, 'children')}>
          {_.map(col.children, (child)=>{
            return this.addField(child, size);
          })}
        </Col>
      );
    });
  }

  button(field: Object, size: string) {
    return (
      <Button key={field.name} bsSize={_.get(field, 'bsSize', size)} type={field.type} bsStyle={_.get(field, 'style', 'primary')}>{field.value}</Button>
    );
  }

  message(field: Object, size: string) {
    const {success, failed} = this.props.getActionState();
    if ((field.type === 'success' && success && this.props.valid === true) || (field.type === 'error' && (failed || (this.props.invalid === true && this.props.pristine === false)))) {
      const style = field.type === 'success' ? 'success' : 'danger';
      return (
        <Alert bsStyle={style} bsSize={_.get(field, 'bsSize', size)}>{field.message}</Alert>
      );
    }
  }

  addField(field, size) {
    if (!_.isEmpty(field)) {
      switch (field.type) {
        case 'submit':
        case 'button':
          return this.button(field, size);
        case 'dropdown':
          return this.dropDown(field, size);
        case 'success':
        case 'error':
          return this.message(field, size);
        default:
          return this.input(field, size);
      }
    }
  }

  render() {
    const {pending} = this.props.getActionState();
    const {fieldsNeeded} = this.props;

    console.log(this.props);

    return (
      <form onSubmit={this.props.handleSubmit(this.props.submit)} ref="form" className={_.get(this.props, 'formClass', 'form-horizontal')}>
        <Pending state={pending}>
          <div formKey={this.props.formKey} >
            {_.map(fieldsNeeded, (field, key) => {
              const size = _.get(field, 'bsSize', 'medium');
              if (field.hasOwnProperty('name')) {
                return this.input(field, size);
              } else if (field.hasOwnProperty('row')) {
                return this.row(field, key, size);
              }
            })}
          </div>
          <input type="button" ref="button" onClick={this.props.handleSubmit(this.props.submit)} className="hidden" />
        </Pending>
      </form>
    );
  }
}

export default BaseForm;
