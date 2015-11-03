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
  AdminUserShow,
  AdminUserEdit,
  AdminUserCreate,
  AdminAffiliates,
  AdminAffiliatesShow,
  AdminAffiliatesEdit,
  AdminAcl,
  NotFound
} from 'components';

export default () => {
  return (
    <Route component={App}>
      <Route component={Site}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}>
          <Route path="/password-forgotten" component={PasswordForgotten} />
          <Route path="/password-reset/:token" component={PasswordReset} />
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
          <Route path="users/:userId" component={AdminUserShow} />
          <Route path="users/:userId/edit" component={AdminUserEdit} />
          <Route path="users/new" component={AdminUserCreate} />
          <Route path="affiliates" component={AdminAffiliates} />
          <Route path="affiliates/:id" component={AdminAffiliatesShow} />
          <Route path="affiliates/:id/edit" component={AdminAffiliatesEdit} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
