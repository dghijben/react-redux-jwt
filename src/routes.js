import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Site,
  Home,
  Login,
  Logout,
  RequireLogin,
  Dashboard,
  RequireAdminLogin,
  About,
  Admin,
  AdminUsers,
  AdminUserCreate,
  NotFound

} from 'components';

export default (store) => {
  return (
    <Route component={App}>
      <Route component={Site}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About}/>
        <Route component={RequireLogin}>
          <Route path="/dashboard" component={Dashboard}/>
        </Route>
      </Route>
      <Route component={RequireAdminLogin}>
        <Route path="admin" component={Admin}>
          <IndexRoute component={AdminUsers}>
            <Route path="create" component={AdminUserCreate}/>
          </IndexRoute>
        </Route>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
