import React from 'react';
import {IndexRoute, Route} from 'react-router';
import * as cmpnnt from 'components';

export default () => {
  return (
    <Route component={cmpnnt.App}>
      <Route path="" component={cmpnnt.Site}>
        <Route path="/" component={cmpnnt.Home}/>
        <Route path="/login" component={cmpnnt.Login}>
          <Route path="/password-forgotten" component={cmpnnt.PasswordForgotten} />
          <Route path="/password-reset/:token" component={cmpnnt.PasswordReset} />
        </Route>
        <Route path="/logout" component={cmpnnt.Logout} />
        <Route path="/about" component={cmpnnt.About}/>

        <Route component={cmpnnt.RequireLogin}>
          <Route path="/dashboard" component={cmpnnt.Dashboard}/>
        </Route>
      </Route>
      <Route component={cmpnnt.RequireAdminLogin}>
        <Route path="admin" component={cmpnnt.Admin}>
          <IndexRoute component={cmpnnt.AdminUsers.List} />

          <Route path="users" component={cmpnnt.AdminUsers.Wrap}>
            <IndexRoute component={cmpnnt.AdminUsers.List} />
            <Route path="new" component={cmpnnt.AdminUsers.Create} />
            <Route path=":userId" component={cmpnnt.AdminUsers.Show} />
            <Route path=":userId/edit" component={cmpnnt.AdminUsers.Edit} />
          </Route>

          <Route path="acl" component={cmpnnt.AdminAclRoles.Wrap}>
            <IndexRoute component={cmpnnt.AdminAclRoles.List} />
            <Route path="new" component={cmpnnt.AdminAclRoles.Create} />
            <Route path=":id" component={cmpnnt.AdminAclRoles.Show} />
            <Route path=":id/edit" component={cmpnnt.AdminAclRoles.Edit} />
          </Route>

        </Route>
      </Route>
      <Route path="*" component={cmpnnt.NotFound} status={404} />
    </Route>
  );
};
