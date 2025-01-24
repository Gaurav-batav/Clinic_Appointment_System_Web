import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import AdminNavbar from "./AdminNavbar";
import SearchAppointmentForm from "../models/SearchAppointmentForm";

const AppointmentList = () => {
  const [filter, setFilter] = useState("all");
  const [Data, setData] = useState([]);
  const [showSearchForm, setShowSearchForm] = useState(false);

  useEffect(() => {
    getAppointments(filter);
  }, [filter]);

  const getAppointments = async (filter) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/appointments/getAppointments_Admin",
        { params: { filter } }
      );
      setData(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  // for Search Appointment
  const handleSearch = (searchData) => {
    // data comes as a object
    const formattedData = Array.isArray(searchData) ? searchData : [searchData]; // Conver data is an array
    setData(formattedData);
  };

  // for update Appointment status
  const updateStatus = async (appointmentId, status) => {
    try {
      if (window.confirm("Are You Sure About Update Appointment STATUS?")) {
        const response = await axios.put(
          "http://localhost:4000/api/appointments/updateStatus",
          { appointmentId, status }
        );
        alert(response.data.message);  
       }
      // Refresh appointments after updating
      getAppointments(filter);
    } catch (error) {
      alert("Failed to update appointment status.");
    }
  };
  
  

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h1 className="heading text-center mt-5">APPOINTMENT LIST</h1>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label htmlFor="filter" className="form-label">
              Filter Appointments:
            </label>
            <select
              id="filter"
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="toDay">Today</option>
              <option value="lastDay">Previous Day</option>
              <option value="weekly">Last Week</option>
              <option value="monthly">Last Month</option>
              <option value="yearly">Last Year</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="tomorrowsNextDay">Tomorrow's Next Day</option>
              <option value="futureWeekly">Next Week</option>
              <option value="futureMonthly">Next Month</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowSearchForm(true)}
          >
            Search Appointments
          </button>
        </div>

        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NO</th>
              <th>DEPARTMENT</th>
              <th>APPOINTMENT DATE</th>
              <th>TIME SLOT</th>
              <th>STATUS</th>
              <th>MARK AS</th>
            </tr>
          </thead>
          <tbody>
  {Data.length > 0 ? (
    Data.map((item, index) => (
      <tr key={index}>
        <td>{item.patient}</td>
        <td>{item.email}</td>
        <td>{item.number}</td>
        <td>{item.department}</td>
        <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
        <td>{item.timeSlot}</td>
        <td>{item.status}</td>
        <td>
          {item.status === "booked" && (
            <>
              <button
                className="btn btn-success btn-sm"
                onClick={() => updateStatus(item._id, "completed")}
              >
               Completed
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => updateStatus(item._id, "cancelled")}
              >
                Cancel
              </button>
            </>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8" className="text-center">
        No Appointments Found
      </td>
    </tr>
  )}
</tbody>

        </Table>

        {showSearchForm && (
          <SearchAppointmentForm
            closeSearchAppointmentForm={() => setShowSearchForm(false)}
            onSearch={handleSearch}
          />
        )}
      </div>
    </>
  );
};

export default AppointmentList;
