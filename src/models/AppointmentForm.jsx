import React, { useState } from "react";
import axios from "axios";
import Button from "../layouts/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles

const AppointmentForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    patient: "",
    email: "",
    number: "",
    department: "",
    date: "", // Store the selected date in formData
    timeSlot: "",
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
      const response = await axios.post(
        "http://localhost:4000/api/appointments/bookAppointment",
        formData
      );

      alert(response.data.message);
      closeForm();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(error.response.data.message);
      } else {
        alert("Failed to book your appointment. Please try again.");
      }
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    // Convert the date to UTC format
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  
    setFormData((prevState) => ({
      ...prevState,
      date: utcDate, // Send the date in UTC
    }));
  };
  

  // Define tomorrow's date
  const today = new Date(); // Get today's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Increment the day by 1 to get tomorrow's date

  // Calculate 30 days from tomorrow
  const maxDate = new Date(tomorrow);
  maxDate.setDate(tomorrow.getDate() + 30);
  
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0; // Disable only Sundays
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-form absolute mt-12 text-black">
        <form
          onSubmit={handleSubmit}
          className="w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl"
        >
          <h1 className="text-4xl font-semibold text-center text-backgroundColor">
            Book Appointment
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
              placeholder="Your Email"
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
          <div className="flex flex-col">
            <label htmlFor="userAppointmentDate" className="mb-2 font-medium">
              Select Appointment Date:
            </label>
            <DatePicker
             selected={selectedDate}
              onChange={handleDateChange}
              minDate={tomorrow} // Tomorrow as the minimum selectable date
              maxDate={maxDate} // 30 days from tomorrow
              filterDate={isWeekday} // Disable weekends
              dateFormat="yyyy-MM-dd" // Backend-friendly format
              className="py-3 px-2 bg-[#d5f2ec] rounded-lg w-full" // Match the style
              placeholderText="Select Date"
              required
            />
          </div>
          <div>
            <label htmlFor="userTimeSlot" className="block mb-2 font-medium">
              Select Time Slot:
            </label>
            <select
              id="userTimeSlot"
              name="timeSlot"
              className="py-2 px-3 border rounded-lg bg-[#d5f2ec]"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">Select Time Slot</option>
              <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
              <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
              <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
              <option value="12:00-01:00">12:00 PM - 01:00 PM</option>
              <option value="01:00-02:00">01:00 PM - 02:00 PM</option>
              <option value="02:00-03:00">02:00 PM - 03:00 PM</option>
              <option value="03:00-04:00">03:00 PM - 04:00 PM</option>
              <option value="04:00-05:00">04:00 PM - 05:00 PM</option>
            </select>
          </div>
          <div className="flex gap-5">
            <Button title="Book" type="submit" />
            <button
              className="bg-backgroundColor text-white px-10 rounded-md active:bg-red-500"
              type="button"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
