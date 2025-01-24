import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";

const DoctorForm = ({ closeDoctorForm, mode }) => {
  const [formData, setFormData] = useState({
    doctor: "",
    email: "",
    number: "",
    department: "",
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
        // Add Doctor API Call
        const response = await axios.post(
          "http://localhost:4000/api/doctors/addDoctor",
          formData
        );
        alert(response.data.message); // Success message from backend
      } else if (mode === "delete") {
        // Delete Doctor API Call
        const response = await axios.delete(
          "http://localhost:4000/api/doctors/deleteDoctor",
          {
            data: formData, 
          }
        );
        alert(response.data.message); // Success message from backend
      }
      window.location.reload(); // Reload the page after successful operation
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
        <form
          onSubmit={handleSubmit}
          className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl"
        >
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            {mode === "add" ? "Add Doctor" : "Delete Doctor"}
          </h1>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Doctor Name"
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
            <div className="flex flex-col">
              <select
                className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="General Physician">General Physician</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Radiology">Radiology</option>
                <option value="Gynecology">Gynecology</option>
              </select>
            </div>
          <div className="flex gap-5">
            <Button title={mode === "add" ? "Add Doctor" : "Delete Doctor"} />
            <button
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              type="button"
              onClick={closeDoctorForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
