import { Route, Routes } from 'react-router-dom'
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
import AuthProvider from './security/AuthContext';
import Userdashboard from './user/Userdashboard';
import UserNotifications from './user/UserNotifications';
import ApproveRequest from './admin/ApproveRequest';
import ListAllUsers from './admin/ListAllUsers';
import ViewUser from './admin/ViewUser';
import UpdateProfile from './user/UpdateProfile';
import DisplayDocument from './user/DisplayDocument';
import DeleteUser from './admin/DeleteUser';
import ImportUser from './admin/ImportUser';
import ErrorPage from './common/ErrorPage';
export default function EMSmain() {
  return (

    <div className="EMSapp">
      <ToastContainer />
      <AuthProvider>

        <Header />
        <Routes>

          <Route path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<UserNotifications />}/>
            <Route path="users" element={<ListAllUsers />} />
            <Route path="approve" element={<ApproveRequest />} />
            <Route path="delete" element={<DeleteUser />} />
            <Route path="import" element={<ImportUser/>} />
            <Route path="viewUserInAdminDashboard/:userId" element={ <Userdashboard/>} />
            <Route path="updateUserInAdminDashboard" element={ <UpdateProfile/>} />
            <Route path="userDocumentInAdminDashboard" element={ <DisplayDocument/>} />



          </Route>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
          <Route path="/userDashboard" element={<Userdashboard />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />

          <Route path="/register" element={<RegisterUser />} />
          <Route path="/errorPage" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/not" element={<UserNotifications />} />
          {/* <Route path="/admin/users" element={<ListAllUsers />} /> */}
          <Route path="/users/documents" element={<DisplayDocument />} />
        </Routes>
        {/* <Footer /> */}

      </AuthProvider>
    </div>

  )
}
