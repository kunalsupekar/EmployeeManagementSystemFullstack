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
import UpdateUserProfile from './user/UpdateUserProfile';
import UserNotifications from './user/UserNotifications';
import ApproveRequest from './admin/ApproveRequest';
import ListAllUsers from './admin/ListAllUsers';
export default function EMSmain() {
  return (

    <div className="EMSapp">
      <ToastContainer />
      <AuthProvider>

        <Header />
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/userDashboard" element={<Userdashboard />} />
          <Route path="/updateUserProfile" element={<UpdateUserProfile />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/not" element={<UserNotifications />} />
          <Route path="/admin/approve" element={<ApproveRequest />} />
          <Route path="/admin/users" element={<ListAllUsers />} />
        </Routes>
        {/* <Footer /> */}

      </AuthProvider>
    </div>

  )
}
