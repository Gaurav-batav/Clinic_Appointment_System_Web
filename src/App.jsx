import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import LoginPatient from "./components/LoginPatient";
import LoginForm from "./models/LoginForm";
import DoctorForm from "./models/DoctorForm";
import AppointmentForm from "./models/AppointmentForm";
import DoctorList from "./components/DoctorList";
import AdminList from "./components/AdminList";
import AppointmentList from "./components/AppointmentList";
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/about" element={<About />} /> 
      <Route path="/services" element={<Services />} /> 
      <Route path="/doctors" element={<Doctors />} /> 
      <Route path="/blog" element={<Blogs />} /> 
      <Route path="/LoginPatient" element={<LoginPatient />} /> 
      <Route path="/AppointmentList" element={<AppointmentList />} />
      <Route path="/doctor-list" element={<DoctorList />} />
      <Route path="/admin-list" element={<AdminList />} />
    

      <Route path="/appointment-list"element={<AppointmentList />} />
      <Route path="/home/LoginPatient" element={<LoginPatient/>} />      

      </Routes>
    </BrowserRouter>

  );
};

export default App;
