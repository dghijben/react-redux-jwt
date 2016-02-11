const modules = {};

import App from './App/App';
modules.App = App;
import Home from './Site/Home/Home';
modules.Home = Home;
import Login from './Site/Login/Login';
modules.Login = Login;
import Registration from './Site/Registration/Registration';
modules.Registration = Registration;
import RegisterVerify from './Site/Registration/Verify';
modules.RegisterVerify = RegisterVerify;
import PasswordForgotten from './Site/Login/PasswordForgotten/PasswordForgotten';
modules.PasswordForgotten = PasswordForgotten;
import PasswordReset from './Site/Login/PasswordReset/PasswordReset';
modules.PasswordReset = PasswordReset;
import Logout from './Site/Logout/Logout';
modules.Logout = Logout;
import About from './Site/About/About';
modules.About = About;
import RequireLogin from './Site/RequireLogin/RequireLogin';
modules.RequireLogin = RequireLogin;
import RequireAdminLogin from './Admin/RequireAdminLogin/RequireAdminLogin';
modules.RequireAdminLogin = RequireAdminLogin;
import Site from './Site/Site';
modules.Site = Site;
import Search from './Site/Search/Search';
modules.Search = Search;
import NotFound from './NotFound/NotFound';
modules.NotFound = NotFound;
import Admin from './Admin/Admin';
modules.Admin = Admin;
import AdminAccounts from './Admin/Accounts';
modules.AdminAccounts = AdminAccounts;
import AdminAccountCategories from './Admin/Accounts/Categories';
modules.AdminAccountCategories = AdminAccountCategories;
import AdminUsers from './Admin/Users';
modules.AdminUsers = AdminUsers;
import AdminPages from './Admin/Pages';
modules.AdminPages = AdminPages;
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

/**
 * Import Dashboard
 */
const Dashboard = {};
import IndexDashboard from './Site/Dashboard/Dashboard';
Dashboard.Index = IndexDashboard;
import DashboardRegister from './Site/Dashboard/Register/Register';
Dashboard.Register = DashboardRegister;
import DashboardSettings from './Site/Dashboard/Settings/Settings';
Dashboard.Settings = DashboardSettings;
import DashboardUser from './Site/Dashboard/User/User';
Dashboard.User = DashboardUser;
import DashboardAffiliates from './Site/Dashboard/Settings/Affiliates/Affiliates';
Dashboard.Affiliates = DashboardAffiliates;


modules.Dashboard = Dashboard;

/**
 * Import CMS
 */
const Cms = {};
import IndexCms from './Cms/Cms';
Cms.Index = IndexCms;
modules.Cms = Cms;


import Profile from './Site/Profile/Profile';
modules.Profile = Profile;
import ProfileAffiliates from './Site/Profile/Affiliates';
modules.ProfileAffiliates = ProfileAffiliates;
import ProfileDiscountCodes from './Site/Profile/DiscountCodes';
modules.ProfileDiscountCodes = ProfileDiscountCodes;

import ProfileOffers from './Site/Profile/Offers';
modules.ProfileOffers = ProfileOffers;
export default modules;
