import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Site,
  Home,
  Login,
  Logout,
  PasswordForgotten,
  PasswordReset,
  RequireLogin,
  Dashboard,
  RequireAdminLogin,
  About,
  Admin,
  AdminUsers,
  AdminUserCreate,
  AdminAcl,
  NotFound
} from 'components';

export default (store) => {
  return (
    <Route component={App}>
      <Route component={Site}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}>
          <Route path="/password-forgotten" component={PasswordForgotten} />
          <Route path="/password-reset/:resetId" component={PasswordReset} />
        </Route>
        <Route path="/logout" component={Logout} />
        <Route path="/about" component={About}/>
        <Route component={RequireLogin}>
          <Route path="/dashboard" component={Dashboard}/>
        </Route>
      </Route>
      <Route component={RequireAdminLogin}>
        <Route path="admin" component={Admin}>
          <IndexRoute component={AdminUsers} />

          <Route path="acl" component={AdminAcl} />
          <Route path="users" component={AdminUsers} />
          <Route path="wrap" component={AdminUserCreate}>
            <Route path="child1" component={AdminUserCreate} />
            <Route path="child2" component={AdminUserCreate} />
            <Route path="child3" component={AdminUserCreate} />
          </Route>
        </Route>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
