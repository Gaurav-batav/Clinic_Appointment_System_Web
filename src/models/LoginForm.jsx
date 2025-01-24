import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ closeLoginForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(formData);

    try {
      if (formData.role === "admin") {
       const response = await axios.post("http://localhost:4000/api/admins/adminlogin", formData);
        closeLoginForm();
        navigate("/appointment-list");
      } else if (formData.role === "patient") {
        const response = await axios.post("http://localhost:4000/api/patients/login&appointment", formData);
        closeLoginForm();
        navigate("/LoginPatient", { state: { appointments: response.data.appointments } });
      } else {
        alert("Invalid role selected");
      }
    } catch (error) {
      alert("Failed To Login Invalid User Email OR Password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form onSubmit={handleSubmit} className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Login
          </h1>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="email"
              name="email"
              id="userEmail"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="number"
              name="number"
              id="userNumber"
              value={formData.number}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col">
            <select
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="patient">PATIENT</option>
              <option value="admin">ADMIN</option>
            </select>
          </div>
         
          <div className="flex gap-5">
            <Button title="Login" type="submit" />
            <button
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              type="button"
              onClick={closeLoginForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
