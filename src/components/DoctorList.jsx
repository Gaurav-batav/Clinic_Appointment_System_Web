import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AdminNavbar from "./AdminNavbar";
import DoctorForm from "../models/DoctorForm";

const DoctorList = () => {
  const [data, setData] = useState([]);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [mode, setMode] = useState("add"); // Mode for add or delete

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/doctors/getDoctor");
      setData(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const openAddDoctorForm = () => {
    setMode("add");
    setShowDoctorForm(true);
  };

  const openDeleteDoctorForm = () => {
    setMode("delete");
    setShowDoctorForm(true);
  };

  const closeDoctorForm = () => {
    setShowDoctorForm(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
      <h1 className="heading text-center mt-5">DOCTOR LIST</h1>
      <div className="mb-3 d-flex justify-content-between">
          <Button className="my-button" onClick={openAddDoctorForm}>
            ADD DOCTOR
          </Button>
          <Button className="delete-button"  onClick={openDeleteDoctorForm}>
            DELETE DOCTOR
          </Button>
        </div>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NO</th>
              <th>DEPARTMENT</th>
              <th>CREATED AT</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.doctor}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{item.department}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {showDoctorForm && <DoctorForm closeDoctorForm={closeDoctorForm} mode={mode} />}
      </div>
    </>
  );
};

export default DoctorList;
