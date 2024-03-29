import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
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
        <Route path="/zoeken" component={cmpnnt.Search}/>
        <Route path="/register" component={cmpnnt.Register} />
        <Route path="/register/verify/:code" component={cmpnnt.RegisterVerify} />

        <Route component={cmpnnt.RequireLogin}>
          <Route path="/dashboard" component={cmpnnt.Dashboard.Index}/>
          <Route path="/dashboard/user" component={cmpnnt.Dashboard.User}/>
          <Route path="/dashboard/register" component={cmpnnt.Dashboard.Register}/>
          <Route path="/dashboard/settings/:id" component={cmpnnt.Dashboard.Settings}/>
          <Route path="/dashboard/settings/:id/affiliates" component={cmpnnt.Dashboard.Affiliates}/>
        </Route>
        <Route path="/p/:id/:name" component={cmpnnt.Profile} ignoreScrollBehavior>
          <IndexRoute component={cmpnnt.ProfileAffiliates} />
          <Route path="aanbiedingen" component={cmpnnt.ProfileOffers}/>
          <Route path="kortingscodes" component={cmpnnt.ProfileDiscountCodes}/>
        </Route>
      </Route>
      <Route path="cms" component={cmpnnt.Cms.Index} />

      <Route component={cmpnnt.RequireAdminLogin}>
        <Route path="admin" component={cmpnnt.Admin}>
          <IndexRoute component={cmpnnt.AdminUsers.List} />

          <Route path="accounts" component={cmpnnt.AdminAccounts.Wrap}>
            <IndexRoute component={cmpnnt.AdminAccounts.List} />
            <Route path="categories" component={cmpnnt.AdminAccountCategories.Wrap}>
              <IndexRoute component={cmpnnt.AdminAccountCategories.List} />
              <Route path="new" component={cmpnnt.AdminAccountCategories.Create} />
              <Route path=":id" component={cmpnnt.AdminAccountCategories.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAccountCategories.Edit} />
            </Route>
            <Route path="new" component={cmpnnt.AdminAccounts.Create} />
            <Route path=":id" component={cmpnnt.AdminAccounts.Show} />
            <Route path=":id/edit" component={cmpnnt.AdminAccounts.Edit} />
          </Route>

          <Route path="users" component={cmpnnt.AdminUsers.Wrap}>
            <IndexRoute component={cmpnnt.AdminUsers.List} />
            <Route path="new" component={cmpnnt.AdminUsers.Create} />
            <Route path=":userId" component={cmpnnt.AdminUsers.Show} />
            <Route path=":userId/edit" component={cmpnnt.AdminUsers.Edit} />
          </Route>

          <Redirect from="acl" to="acl/roles" />
          <Route path="acl" component={cmpnnt.AdminAcl}>
            <Route path="roles" component={cmpnnt.AdminAclRoles.Wrap}>
              <IndexRoute component={cmpnnt.AdminAclRoles.List} />
              <Route path="new" component={cmpnnt.AdminAclRoles.Create} />
              <Route path=":id" component={cmpnnt.AdminAclRoles.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAclRoles.Edit} />
            </Route>
          </Route>

          <Route path="affiliates" component={cmpnnt.AdminAffiliates}>
            <Route path="sites" component={cmpnnt.AdminAffiliatesSites.Wrap}>
              <IndexRoute component={cmpnnt.AdminAffiliatesSites.List} />
              <Route path="new" component={cmpnnt.AdminAffiliatesSites.Create} />
              <Route path="upload-csv" component={cmpnnt.AdminAffiliatesSites.UploadCsv} />
              <Route path=":id" component={cmpnnt.AdminAffiliatesSites.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAffiliatesSites.Edit} />
            </Route>

            <Route path="categories" component={cmpnnt.AdminAffiliatesCategories.Wrap}>
              <IndexRoute component={cmpnnt.AdminAffiliatesCategories.List} />
              <Route path="new" component={cmpnnt.AdminAffiliatesCategories.Create} />
              <Route path=":id" component={cmpnnt.AdminAffiliatesCategories.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAffiliatesCategories.Edit} />
            </Route>

            <Route path="discount-codes" component={cmpnnt.AdminAffiliatesDiscountCodes.Wrap}>
              <IndexRoute component={cmpnnt.AdminAffiliatesDiscountCodes.List} />
              <Route path="new" component={cmpnnt.AdminAffiliatesDiscountCodes.Create} />
              <Route path=":id" component={cmpnnt.AdminAffiliatesDiscountCodes.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAffiliatesDiscountCodes.Edit} />
            </Route>

            <Route path="offers" component={cmpnnt.AdminAffiliatesOffers.Wrap}>
              <IndexRoute component={cmpnnt.AdminAffiliatesOffers.List} />
              <Route path="new" component={cmpnnt.AdminAffiliatesOffers.Create} />
              <Route path=":id" component={cmpnnt.AdminAffiliatesOffers.Show} />
              <Route path=":id/edit" component={cmpnnt.AdminAffiliatesOffers.Edit} />
            </Route>
          </Route>
        </Route>

      </Route>
      <Route path="*" component={cmpnnt.NotFound} status={404} />
    </Route>
  );
};
