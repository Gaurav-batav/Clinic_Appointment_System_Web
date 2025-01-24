import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";

const AdminForm = ({ closeAdminForm, mode }) => {
  const [formData, setFormData] = useState({
    admin: "",
    email: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        // Add Admin API Call
        const response = await axios.post(
          "http://localhost:4000/api/admins/addAdmin",
          formData
        );
        alert(response.data.message);
      } else if (mode === "delete") {
        // Delete Admin API Call
        const response = await axios.delete(
          "http://localhost:4000/api/admins/deleteAdmin",{
            data: formData, 
          });
        alert(response.data.message);
      }
      window.location.reload();
    } catch (error) {
      // Check if the error response is available
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Backend-defined error message
      } else {
        alert("An unexpected error occurred. Please try again."); // Fallback error message
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form onSubmit={handleSubmit} className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            {mode === "add" ? "Add Admin" : "Delete Admin"}
          </h1>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="text"
              name="admin"
              value={formData.admin}
              onChange={handleChange}
              placeholder="Admin Name"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Phone No"
              required
            />
          </div>
          <div className="flex gap-5">
            <Button title={mode === "add" ? "Add Admin" : "Delete Admin"} type="submit" />
            <button
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              type="button"
              onClick={closeAdminForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm;
