import _ from 'lodash';
import React, {Component, PropTypes } from 'react';
import { load } from '../../../redux/modules/admin/users/userActions';
import { storeState } from '../../../redux/modules/reduxRouter/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {Well} from 'react-bootstrap';
const queryString = require('query-string');
import Ribbon from '../includes/Ribbon';
import DataOverview from '../includes/DataOverview';

const reducerIndex = 'users';


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushState: bindActionCreators(pushState, dispatch)
  };
}

@connect(state=>{
  const obj = {
    'router': state.router,
    'reduxRouterReducer': state.reduxRouterReducer
  };
  obj[reducerIndex] = state[reducerIndex];
  return obj;
}, mapDispatchToProps)

class Users extends Component {

  static propTypes = {
    'users': PropTypes.object,
    'router': PropTypes.object,
    'reduxRouterReducer': PropTypes.object,
    'fields': PropTypes.object,
    'history': PropTypes.object,
    'pushState': PropTypes.func,
    'dispatch': PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.switchPage = this.switchPage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pushState = this.pushState.bind(this);
    this.state = {
      searchForm: {}
    };
  }

  componentWillMount() {
    const pathname = this.props.router.location.pathname;
    this.setState({
      searchForm: {
        search: _.get(this.props.router, 'location.query.search') || _.get(this.props, 'reduxRouterReducer.routes[' + pathname + '].searchForm.search', ''),
        searchField: _.get(this.props.router, 'location.query.searchField') || _.get(this.props, 'reduxRouterReducer.routes[' + pathname + '].searchForm.searchField', '')
      }
    });
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const params = {};
    const pathname = state.router.location.pathname;

    params.page = _.get(state.router, 'location.query.page') || _.get(state, 'reduxRouterReducer.routes[' + pathname + '].page');
    params.search = _.get(state.router, 'location.query.search') || _.get(state, 'reduxRouterReducer.routes[' + pathname + '].searchForm.search');
    params.searchField = _.get(state.router, 'location.query.searchField') || _.get(state, 'reduxRouterReducer.routes[' + pathname + '].searchForm.searchField');
    return dispatch(load(_.omit(params, (value)=>{ return !value; })));
  }

  pushState() {
    const q = queryString.stringify({
      page: this.state.page,
      search: _.get(this.state, 'searchForm.search'),
      searchField: _.get(this.state, 'searchForm.searchField')
    });
    this.props.dispatch(storeState(this.props.router.location.pathname, this.state));
    this.props.pushState(null, _.get(this.props.router, 'location.pathname') + '?' + q);
  }

  switchPage(page) {
    this.setState({page: page}, this.pushState);
  }

  handleSearch(data) {
    console.log('HOIS!!', data);
    this.setState({searchForm: {...data}, page: 1}, this.pushState);
  }

  render() {

    const click1 = (item) => {
      this.props.history.pushState({}, '/admin/users/' + item.id);
    };

    const click2 = () => {
      console.log('CLick 2');
    };

    const breadcrumps = [
      {name: 'Admin', to: '/admin'},
      {name: 'Users'}
    ];

    const form = {
      name: 'searchForm',
      key: 'key1',
      onSubmit: this.handleSearch,
      fields: [
        {name: 'search', type: 'text', placeHolder: 'zoeken...',
          buttonBefore: {
            name: 'searchField', type: 'dropdown',
            items: [
              {default: 'Alle'},
              {name: 'Voornaam', field: 'firstname'},
              {name: 'Achternaam', field: 'lastname'},
              {name: 'Volledige naam', field: 'fullname'},
              {name: 'E-mail', field: 'email'}
            ]
          }
        }
      ],
      initialValues: this.state.searchForm
    };


    return (
      <div>
        <Ribbon breadcrumps={breadcrumps}/>
        <div id="content">

          <Well>
            <DataOverview
              form={form}
              data={this.props.users}
              cols={[
                {name: 'Naam', show: ['firstname', 'middlename', 'lastname']},
                {name: 'Email', show: 'email'},
                {name: 'Aangemaakt', show: 'created_at'},
                {name: 'Gewijzigd', show: 'updated_at'},
                {name: 'Acties', dropdownButton: [
                  {name: 'wijzigen', onClick: click1},
                  {divider: true},
                  {name: 'verwijder', onClick: click2},
                ]}
              ]}

              />
          </Well>


        </div>
      </div>
    );
  }
}

export default Users;
