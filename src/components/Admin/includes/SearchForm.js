import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {connectReduxForm} from 'redux-form';
import {DropdownButton, Button, MenuItem, Input} from 'react-bootstrap';


@connectReduxForm({
  fields: ['search'],
  form: 'searchForm'
})
class SearchForm extends Component {

  static propTypes = {
    placeHolder: PropTypes.string.isRequired,
    dropDownTitle: PropTypes.string,
    dropDown: PropTypes.array,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.dropDown = this.dropDown.bind(this);
    this.state = {
      dropDownTitleDefault: 'Alle'
    };
  }


  dropDownSelect(item) {
    this.setState({dropDownTitle: item.title});
  }

  dropDown() {
    if (!_.isEmpty(this.props.dropDown)) {
      const menuItem = [];
      let dropDownTitle = null;
      _.map(this.props.dropDown, (item, key) => {
        const select = () => { this.dropDownSelect(item); };

        if (item.hasOwnProperty('default')) {
          dropDownTitle = item.default;
          menuItem.push( <MenuItem key={key} onSelect={select}>{item.default}</MenuItem>);
          menuItem.push( <MenuItem key={key + '_div'} divider/>);
        } else {
          menuItem.push( <MenuItem key={key} onSelect={select}>{item.title}</MenuItem>);
        }

      });

      if (menuItem.length > 0) {
        return (
          <DropdownButton bsSize="large" title={this.state.dropDownTitle || dropDownTitle || this.state.dropDownTitleDefault} id="input-dropdown-addon">
            {menuItem}
          </DropdownButton>
        );
      }
    }
  }

  render() {

    const searchButton = <Button bsSize="large" type="submit" onClick={this.props.handleSubmit}><i className="fa fa-search"></i></Button>;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Input type="text" name="search" bsSize="large" placeholder={this.props.placeHolder}
             buttonBefore={this.dropDown()}
             buttonAfter={searchButton}
          {...this.props.fields.search}
        />
      </form>
    );
  }
}

export default SearchForm;
