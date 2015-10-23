import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import {connectReduxForm} from 'redux-form';
import {DropdownButton, Button, MenuItem, Input} from 'react-bootstrap';
import {updateField} from 'redux/modules/reduxForm/actions';

class SearchFormWrap extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    placeHolder: PropTypes.string.isRequired,
    dropDownTitle: PropTypes.string,
    dropDown: PropTypes.array,
    initialValues: PropTypes.object
  };

  render() {
    class SearchFormClass extends Component { // eslint-disable-line react/no-multi-comp

      static propTypes = {
        placeHolder: PropTypes.string.isRequired,
        dropDownTitle: PropTypes.string,
        dropDown: PropTypes.array,
        handleSubmit: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        fields: PropTypes.array.isRequired
      }

      constructor(props, context) {
        super(props, context);
        this.dropDown = this.dropDown.bind(this);
        this.state = {
          dropDownTitleDefault: 'Alle'
        };
      }

      componentWillMount() {
        const searchField = _.get(this.props, 'initialValues.searchField');
        if (searchField) {
          if (!_.isEmpty(this.props.dropDown)) {
            const item = _.find(this.props.dropDown, {field: searchField});
            if (item) {
              this.setState({dropDownTitle: item.name});
            }
          }
        }
      }

      dropDownSelect(item) {
        this.setState({dropDownTitle: item.name});
        this.props.dispatch(updateField('searchField', item.field));
        if (_.get(this.props, 'fields.search.value')) {
          this.props.handleSubmit();
        }
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
              menuItem.push( <MenuItem key={key} onSelect={select}>{item.name}</MenuItem>);
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
          <form ref="searchForm" onSubmit={this.props.handleSubmit}>
            <Input type="text" name="search" bsSize="large" placeholder={this.props.placeHolder}
                   buttonBefore={this.dropDown()}
                   buttonAfter={searchButton}
              {...this.props.fields.search}
              />
            <Input type="hidden" name="searchField" {...this.props.fields.searchField} />
          </form>
        );
      }
    }

    console.log('Log', this.props);
    const SearchForm = connectReduxForm({ form: 'serachForm', fields: ['search'] })(SearchFormClass);

    const {name, fields, dispatch, onSubmit, placeHolder, initialValues} = this.props;

    return (<SearchForm
      name={name}
      fields={fields}
      dispatch={dispatch}
      handleSubmit={onSubmit}
      placeHolder={placeHolder}
      />);
  }
}

export default SearchFormWrap;
