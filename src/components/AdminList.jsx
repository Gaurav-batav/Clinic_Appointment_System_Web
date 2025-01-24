import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AdminNavbar from "./AdminNavbar";
import AdminForm from "../models/AdminForm";

const AdminList = () => {
  const [data, setData] = useState([]); // Admin data
  const [showAdminForm, setShowAdminForm] = useState(false); // Toggle form visibility
  const [formMode, setFormMode] = useState("add"); // Form mode: "add" or "delete"

  useEffect(() => {
    getApi();
  }, []);

  // Fetch admin data from the API
  const getApi = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/admins/getadmin");
      setData(response.data.admin);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h1 className="heading text-center mt-5">ADMIN LIST</h1>
        <div className="mb-3 d-flex justify-content-between">
          <Button
            onClick={() => {
              setFormMode("add");
              setShowAdminForm(true);
            }}
            className="my-button"
          >
            ADD ADMIN
          </Button>
          <Button
            onClick={() => {
              setFormMode("delete");
              setShowAdminForm(true);
            }}
            className="delete-button"
          >
            DELETE ADMIN
          </Button>
        </div>

        {showAdminForm && (
          <AdminForm
            closeAdminForm={() => setShowAdminForm(false)}
            mode={formMode} // Pass mode to AdminForm
          />
        )}

        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NO</th>
              <th>CREATED AT</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.admin}</td>
                  <td>{item.email}</td>
                  <td>{item.number}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Admins Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AdminList;
