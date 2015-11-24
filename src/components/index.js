const modules = {};

import App from './App/App';
modules.App = App;
import Home from './Site/Home/Home';
modules.Home = Home;
import Login from './Site/Login/Login';
modules.Login = Login;
import PasswordForgotten from './Site/Login/PasswordForgotten/PasswordForgotten';
modules.PasswordForgotten = PasswordForgotten;
import PasswordReset from './Site/Login/PasswordReset/PasswordReset';
modules.PasswordReset = PasswordReset;
import Logout from './Site/Logout/Logout';
modules.Logout = Logout;
import About from './Site/About/About';
modules.About = About;
import Dashboard from './Site/Dashboard/Dashboard';
modules.Dashboard = Dashboard;
import RequireLogin from './Site/RequireLogin/RequireLogin';
modules.RequireLogin = RequireLogin;
import RequireAdminLogin from './Admin/RequireAdminLogin/RequireAdminLogin';
modules.RequireAdminLogin = RequireAdminLogin;
import Site from './Site/Site';
modules.Site = Site;
import NotFound from './NotFound/NotFound';
modules.NotFound = NotFound;
import Admin from './Admin/Admin';
modules.Admin = Admin;
import AdminUsers from './Admin/Users';
modules.AdminUsers = AdminUsers;
import AdminAcl from './Admin/Acl/Acl';
modules.AdminAcl = AdminAcl;
import AdminAclRoles from './Admin/Acl/Roles';
modules.AdminAclRoles = AdminAclRoles;
import AdminAclRoutes from './Admin/Acl/Routes';
modules.AdminAclRoutes = AdminAclRoutes;
import AdminAffiliates from './Admin/Affiliates/Affiliates';
modules.AdminAffiliates = AdminAffiliates;
import AdminAffiliatesSites from './Admin/Affiliates/Sites';
modules.AdminAffiliatesSites = AdminAffiliatesSites;
import AdminAffiliatesCategories from './Admin/Affiliates/Categories';
modules.AdminAffiliatesCategories = AdminAffiliatesCategories;
import AdminAffiliatesDiscountCodes from './Admin/Affiliates/DiscountCodes';
modules.AdminAffiliatesDiscountCodes = AdminAffiliatesDiscountCodes;
import AdminAffiliatesOffers from './Admin/Affiliates/Offers';
modules.AdminAffiliatesOffers = AdminAffiliatesOffers;

const Cms = {};
import IndexCms from './Cms/Cms';
Cms.Index = IndexCms;

modules.Cms = Cms;

export default modules;
