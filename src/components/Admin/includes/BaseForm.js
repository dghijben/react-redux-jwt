import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import {DropdownButton, MenuItem, Input, Button} from 'react-bootstrap';
import {updateField} from 'redux/modules/reduxForm/actions';

class BaseForm extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    fieldsNeeded: PropTypes.array.isRequired,
    formKey: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.addOnButton = this.addOnButton.bind(this);
    this.dropDownSelect = this.dropDownSelect.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.input = this.input.bind(this);
    this.state = {
      dropDownTitle: {},
      hidden: []
    };
  }

  dropDownSelect(name, item) {
    this.setState(_.set(Object.assign({}, this.state), ['dropDownTitle', name], item.desc || item.default));
    Promise.resolve(this.props.dispatch(updateField(name, item.field, _.get(this.props, 'formKey', null))))
    .then(this.refs.button.click());
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
    return (
      <Input type="text" name="search" bsSize={_.get(field, 'bsSize', size)} placeholder={_.get(field, 'placeholder', '')}
        {...this.props.fields[field.name]}
        buttonBefore={this.addOnButton(_.get(field, 'buttonBefore', {}))}
        buttonAfter={this.addOnButton(_.get(field, 'buttonAfter', {}))}
      />
    );
  }

  button(field: Object, size: string) {
    return (
      <Button bsSize={_.get(field, 'bsSize', size)} type={field.type} bsStyle={_.get(field, 'style', 'primary')}>{field.value}</Button>
    );
  }

  addOnButton(button, size) {
    if (!_.isEmpty(button)) {
      switch (button.type) {
        case 'submit':
          return this.button(button, size);
        case 'dropdown':
          return this.dropDown(button, size);
        default:
          return this.input(button, size);
      }
    }
  }

  render() {
    const { fieldsNeeded, fields } = this.props;

    return (
      <form onSubmit={this.props.handleSubmit} ref="form">
        <div formKey={this.props.formKey} >
          {_.map(fieldsNeeded, (field, key) => {
            const size = _.get(field, 'bsSize', '');
            return (
              <Input key={key} type="text" name="search" bsSize={size} placeholder={_.get(field, 'placeholder', '')}
              {...fields[field.name]}
                buttonBefore={this.addOnButton(_.get(field, 'buttonBefore', {}), size)}
                buttonAfter={this.addOnButton(_.get(field, 'buttonAfter', {}), size)}
              />
            );
          })}
        </div>
        <input type="button" ref="button" onClick={this.props.handleSubmit} className="hidden" />
      </form>
    );
  }
}

export default BaseForm;
