import { useLocation, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const LoginPatient = () => {
  const { state } = useLocation(); // Access state passed via navigate
  const navigate = useNavigate();

  // Extract appointments array from state
  const appointments = state?.appointments;
  console.log(state);  // Log the entire state
  console.log(appointments);  // Log the appointments
  
  const homePage = () => {
    if (window.confirm("Do you want to go to the HOME SECTION?")) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center">PATIENT APPOINTMENTS</h1>
        <div className="text-center mb-3">
          <Button className="my-button" onClick={homePage}>
            GO TO HOME SECTION
          </Button>
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
              <th>CREATED AT</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.patient}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.number}</td>
                  <td>{appointment.department}</td>
                  <td>{new Date(appointment.date).toLocaleDateString("en-GB")}</td>
                  <td>{appointment.timeSlot}</td>
                  <td>{appointment.status}</td>
                  <td>{new Date(appointment.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No Appointment Information Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LoginPatient;
