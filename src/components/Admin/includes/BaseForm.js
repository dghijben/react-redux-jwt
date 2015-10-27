import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import {DropdownButton, MenuItem, Input} from 'react-bootstrap';
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
    this.setState(_.set(Object.assign({}, this.state), ['dropDownTitle', name], item.name || item.default));
    this.props.dispatch(updateField(name, item.field, _.get(this.props, 'formKey', null)));

    // this.props.handleSubmit();
    console.log('SAY what>?');
  }

  dropDown(field) {

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
          dropDownTitle = item.name;
        }
        menuItem.push( <MenuItem key={key} onSelect={this.props.handleSubmit(select)}>{item.name}</MenuItem>);
      }
    });

    if (menuItem.length > 0) {
      return (
        <DropdownButton bsSize="large" title={_.get(this.state, ['dropDownTitle', field.name]) || dropDownTitle} id="input-dropdown-addon">
          {menuItem}
        </DropdownButton>
      );
    }
  }

  input(field) {
    return (
      <Input type="text" name="search" bsSize="large" placeholder={_.get(field, 'placeholder', '')}
      {...this.props.fields[field.name]}
           buttonBefore={this.addOnButton(_.get(field, 'buttonBefore', {}))}
      />
    );
  }

  addOnButton(button) {
    if (!_.isEmpty(button)) {
      switch (button.type) {
        case 'dropdown':
          return this.dropDown(button);
        default:
          return this.input(button);
      }
    }
  }

  render() {
    const { fieldsNeeded, fields } = this.props;
    console.log('Props', this.props);
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div formKey={this.props.formKey} >
          {_.map(fieldsNeeded, (field, key) => {
            return (
              <Input key={key} type="text" name="search" bsSize="large" placeholder={_.get(field, 'placeholder', '')}
              {...fields[field.name]}
                buttonBefore={this.addOnButton(_.get(field, 'buttonBefore', {}))}
              />
            );
          })}
          <input type="button" value="verstuur"/>
        </div>
      </form>
    );
  }
}

export default BaseForm;
