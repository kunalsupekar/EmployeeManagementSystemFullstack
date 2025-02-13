import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import { ToastContainer } from "react-toastify";
import Login from './common/Login'
import Header from './common/Header'
///import Footer from './common/Footer'
import Logout from './common/Logout'
import './EMSApp.css'
import Welcome from './common/Welcome'
import AdminDashboard from './admin/AdminDashboard'
import RegisterUser from './user/RegisterUser'
import "react-toastify/dist/ReactToastify.css";
import AuthProvider, { useAuth } from './security/AuthContext';
import Userdashboard from './user/Userdashboard';
import ApproveRequest from './admin/ApproveRequest';
import ListAllUsers from './admin/ListAllUsers';
import ViewUser from './admin/ViewUser';
import UpdateProfile from './user/UpdateProfile';
import DisplayDocument from './user/DisplayDocument';
import DeleteUser from './admin/DeleteUser';
import ImportUser from './admin/ImportUser';
import ErrorPage from './common/ErrorPage';
import UserLoginHistory from './admin/UserLoginHistory';
import RegisterUserViaEmail from './admin/RegisteruserViaEmail';
import NotFound from './common/NotFound';
import UserMessages from './user/UserMessages';
import AdminSendMessage from './admin/AdminSendMessage';
import AdminMessageComponent from './admin/AdminMessageComponent';

function AuthenticatedRoute({ children }) {
  // const authContext = sessionStorage.getItem("isAuthenticated")

  // if (authContext)
  //   return children


  // console.log(authContext)
  // return <Navigate to="/" />


  const authContext = useAuth(); // Get auth state

  if (authContext.loading) {
    return <div>Loading...</div>; // Prevent flickering
  }

  return authContext.isAuthenticated ? children : <Navigate to="/login" replace />;
}


export default function EMSmain() {
  return (

    <div className="EMSapp">
      <ToastContainer />
      <AuthProvider>

        <Header />
        <Routes>

          <Route path="/" element={<Welcome />} />

          <Route path="/admin" element={
            <AuthenticatedRoute>
              <AdminDashboard />
            </AuthenticatedRoute>
          }>
            <Route path="" element={<AdminMessageComponent />} />
            <Route path="users" element={<ListAllUsers />} />
            <Route path="approve" element={<ApproveRequest />} />
            <Route path="delete" element={<DeleteUser />} />
            <Route path="import" element={<ImportUser />} />
            
            <Route path="register" element={<RegisterUserViaEmail />} />
            <Route path="loginHistory" element={< UserLoginHistory/>} />
            <Route path="viewUserInAdminDashboard/:userId" element={<Userdashboard />} />
            <Route path="updateUserInAdminDashboard" element={<UpdateProfile />} />
            <Route path="userDocumentInAdminDashboard" element={<DisplayDocument />} />
          </Route>



          <Route path="/userDashboard" element={
            <AuthenticatedRoute>
              <Userdashboard />
            </AuthenticatedRoute>} />

          <Route path="/updateProfile" element={
            <AuthenticatedRoute>
              <UpdateProfile />
            </AuthenticatedRoute>         } />

          <Route path="/register" element={<RegisterUser />} />
          <Route path="/errorPage" element={<ErrorPage />} />
          <Route path="/userMessages" element={<UserMessages />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/not" element={<UserNotifications />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/users/documents" element={
            <AuthenticatedRoute>
            <DisplayDocument />
            </AuthenticatedRoute>} />
        </Routes>
        {/* <Footer /> */}

      </AuthProvider>
    </div>

  )
}
