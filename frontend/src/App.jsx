import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PasswordReset from './pages/PasswordReset';
import ResetPasswordWithToken from './pages/ResetPasswordWithToken';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRedirect from './routes/RoleRedirect';
import AppLayout from './layouts/AppLayout';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import MyQR from './pages/user/MyQR';
import Transfer from './pages/user/Transfer';
import Redeem from './pages/user/Redeem';
import RedemptionQR from './pages/user/RedemptionQR';
import UserPromotions from './pages/user/Promotions';
import UserEvents from './pages/user/Events';
import UserEventDetails from './pages/user/EventDetails';
import UserTransactions from './pages/user/Transactions';

// Cashier Pages
import CashierDashboard from './pages/cashier/CashierDashboard';
import Purchase from './pages/cashier/Purchase';
import RedemptionsProcess from './pages/cashier/RedemptionsProcess';
import RegisterCustomer from './pages/cashier/RegisterCustomer';

// Manager Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerUsers from './pages/manager/Users';
import ManagerUserDetails from './pages/manager/UserDetails';
import ManagerTransactions from './pages/manager/Transactions';
import ManagerTransactionDetails from './pages/manager/TransactionDetails';
import ManagerPromotions from './pages/manager/Promotions';
import ManagerPromotionForm from './pages/manager/PromotionForm';
import ManagerEvents from './pages/manager/Events';
import ManagerEventForm from './pages/manager/EventForm';

// Organizer Pages
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import OrganizerEvents from './pages/organizer/Events';
import OrganizerEventDetails from './pages/organizer/EventDetails';

// Superuser Pages
import SuperuserDashboard from './pages/superuser/SuperuserDashboard';
import SuperuserRoles from './pages/superuser/Roles';

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/reset-password/:token" element={<ResetPasswordWithToken />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<RoleRedirect />} />
        <Route path="/profile" element={<Profile />} />

        {/* User Routes */}
        <Route path="/user">
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="my-qr" element={<MyQR />} />
          <Route path="transfer" element={<Transfer />} />
          <Route path="redeem" element={<Redeem />} />
          <Route path="redemption-qr" element={<RedemptionQR />} />
          <Route path="promotions" element={<UserPromotions />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="events/:eventId" element={<UserEventDetails />} />
          <Route path="transactions" element={<UserTransactions />} />
        </Route>

        {/* Cashier Routes */}
        <Route path="/cashier">
          <Route path="dashboard" element={<CashierDashboard />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="redemptions/process" element={<RedemptionsProcess />} />
          <Route path="register-customer" element={<RegisterCustomer />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager">
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="users" element={<ManagerUsers />} />
          <Route path="users/:userId" element={<ManagerUserDetails />} />
          <Route path="transactions" element={<ManagerTransactions />} />
          <Route path="transactions/:transactionId" element={<ManagerTransactionDetails />} />
          <Route path="promotions" element={<ManagerPromotions />} />
          <Route path="promotions/new" element={<ManagerPromotionForm />} />
          <Route path="promotions/:promoId" element={<ManagerPromotionForm />} />
          <Route path="events" element={<ManagerEvents />} />
          <Route path="events/new" element={<ManagerEventForm />} />
          <Route path="events/:eventId" element={<ManagerEventForm />} />
        </Route>

        {/* Organizer Routes */}
        <Route path="/organizer">
          <Route path="dashboard" element={<OrganizerDashboard />} />
          <Route path="events" element={<OrganizerEvents />} />
          <Route path="events/:eventId" element={<OrganizerEventDetails />} />
        </Route>

        {/* Superuser Routes */}
        <Route path="/superuser">
          <Route path="dashboard" element={<SuperuserDashboard />} />
          <Route path="roles" element={<SuperuserRoles />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
