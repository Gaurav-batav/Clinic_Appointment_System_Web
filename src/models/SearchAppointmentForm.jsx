import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";

const SearchAppointmentForm = ({ closeSearchAppointmentForm, onSearch }) => {
  const [formData, setFormData] = useState({
    patient: "",
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
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.post(
        "http://localhost:4000/api/appointments/searchAppointment",
        formData
      );
  
      // Pass the search result to the parent component
      if (response.data.searchAppointment && response.data.searchAppointment.length > 0) {
        onSearch(response.data.searchAppointment); // Pass the result
        closeSearchAppointmentForm(); // Close the form
      } 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message);
      } else {
        alert("Failed to book your appointment. Please try again.");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form onSubmit={handleSubmit} className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl">
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Search Appointment
          </h1>
          <div className="flex flex-col">
            <input
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg"
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder="Patient Name"
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
            <Button title="Search" type="submit" />
            <button
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              type="button"
              onClick={closeSearchAppointmentForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchAppointmentForm;
