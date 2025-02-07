import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import { ToastContainer } from "react-toastify";
import Login from './common/Login'
import Header from './common/Header'
import Footer from './common/Footer'
import Logout from './common/Logout'
import './EMSApp.css'
import Welcome from './common/Welcome'
import AdminDashboard from './admin/AdminDashboard'
import RegisterUser from './user/RegisterUser'
export default function EMSmain() {
  return (

    <div className="EMSapp">
       <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>


          <Route path="/"  element={<Welcome />} />
          <Route path="/adminDashboard" element={<AdminDashboard/>} />
          <Route path="/register" element={<RegisterUser/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>

  )
}
