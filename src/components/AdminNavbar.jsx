import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../layouts/Button";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import DoctorForm from "../models/DoctorForm";
import AdminForm from "../models/AdminForm";

const AdminNavbar = () => {
  const [menu, setMenu] = useState(false);


  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };


  const navigate = useNavigate();
  const homePage= () => {
    if (window.confirm("Do you want to go to the HOME SECTION?")) {
        navigate("/");
    }
  }

  return (
    <div className="navbar">
    <div className=" fixed w-full z-10 text-white">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className=" flex flex-row items-center cursor-pointer">
            <Link to="/#" >
              <h1 className=" text-2xl font-semibold">Wellness Infinite Hospital</h1>
            </Link>
          </div>

          <nav className=" hidden lg:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/appointment-list"
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Apointments
            </Link>
            <Link
              to="/doctor-list"
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Doctors
            </Link>
            <Link
              to="/admin-list"
              className=" hover:text-hoverColor transition-all cursor-pointer"
            >
              Admin
            </Link>  
          </nav>
          <div className=" hidden lg:flex">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={homePage}
            >
              Back TO Home
            </button>
          </div>

          <div className=" lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={28} onClick={handleChange} />
            ) : (
              <AiOutlineMenu size={28} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="/appointment-list"
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Appointments
          </Link>
          <Link
            to="/doctor-list"
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Doctors
          </Link>
          <Link
            to="/admin-list"
            className=" hover:text-hoverColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Admin
          </Link>

          <div className=" lg:hidden">
            <button
              className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
              onClick={homePage}
            >
              Back TO Home
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminNavbar;
