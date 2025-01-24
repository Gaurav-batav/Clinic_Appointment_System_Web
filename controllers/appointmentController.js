import Appointment from '../schema/Appointment.js';
import Patient from '../schema/Patient.js';

 export const bookAppointment = async (req, res) => {
    const { patient, email, number, department, date, timeSlot } = req.body;


    try {
        const utcDate = new Date(date);
        // Check if the patient exists
        let existingPatient = await Patient.findOne({ email, number });

        if (!existingPatient) {
            // Create a new patient
            existingPatient = await Patient.create({ patient, email, number });
        }

        // Check if the patient already has an active appointment
        const activeAppointment = await Appointment.findOne({
            email,
            number,
            status: 'booked', // Only check "booked" status
        });

        if (activeAppointment) {
            return res.status(404).json({
                status: 404,
                message: 'You Already Have An Active Appointment. Please Complete Or Cancel It First.',
            });
        }

        // Create a new appointment
        const newAppointment = await Appointment.create({
            patient: existingPatient.patient,
            email: existingPatient.email,
            number: existingPatient.number,
            department,
            date: utcDate, // Store as UTC
            timeSlot,
            patientId: existingPatient._id, // Link appointment to the patient
            status: 'booked', // Default to booked
        });

        res.status(200).json({
            status: 200,
            message: 'Appointment Booked Successfully!',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error('Error in booking appointment:', error.message);
        if (error.code === 11000) {
            res.status(404).json({
                status: 400,
                message: 'Duplicate Data Detected. Please verify Your Details.',
            });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
};



// Get Appointments By Search
 export const SearchAppointment = async (req, res) => {
    try {
      const { patient, email, number } = req.body;
  
      // Perform the search query
      const searchAppointment = await Appointment.find({ patient, email, number });
  
      // Handle case where no appointment is found
      if (searchAppointment.length === 0) {
        return res.status(404).json({ status: 404, message: "Appointment Not Found. Kindly Provide The Correct Details." });
      }
  
      // If appointment is found
      return res.status(200).json({
        status: "200",
        message: "Search Appointment Successful",
        searchAppointment,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Update Appointment Status
export const updateStatus =async (req, res) => {
    const { appointmentId, status } = req.body;
  
    if (!appointmentId || !status) {
      return res.status(404).json({ message: "Appointment ID and status are required" });
    }
  
    try {
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true }
      );
  
      res.status(200).json({ message: "Status Updated Successfully", appointment });
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

// Get all appointments
 export const getAppointments_Admin = async (req, res) => {
    try {
        const { filter } = req.query; // Extract the filter query
        const now = new Date();
        let startDate = null;
        let endDate = null;

        switch (filter) {
            // Present (Today)
            case 'toDay':
                startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
                endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
                break;

            // Past: Last Day
            case 'lastDay':
                startDate = new Date();
                startDate.setDate(now.getDate() - 1); // Start of yesterday
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setDate(now.getDate() - 1); // End of yesterday
                endDate.setHours(23, 59, 59, 999);
                break;

            // Past: Weekly (Last 7 days)
            case 'weekly':
                startDate = new Date();
                startDate.setDate(now.getDate() - 7); // 7 days ago
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setHours(23, 59, 59, 999); // End of today
                break;

            // Past: Monthly (Last 30 days)
            case 'monthly':
                startDate = new Date();
                startDate.setDate(now.getDate() - 30); // 30 days ago
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setHours(23, 59, 59, 999); // End of today
                break;

            // Past: Yearly (Last 365 days)
            case 'yearly':
                startDate = new Date();
                startDate.setDate(now.getDate() - 365); // 365 days ago
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setHours(23, 59, 59, 999); // End of today
                break;

            // Future: Tomorrow
            case 'tomorrow':
                startDate = new Date();
                startDate.setDate(now.getDate() + 1); // Tomorrow
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setDate(now.getDate() + 1); // Tomorrow
                endDate.setHours(23, 59, 59, 999);
                break;

            // Future: Day After Tomorrow
            case 'tomorrowsNextDay':
                startDate = new Date();
                startDate.setDate(now.getDate() + 2); // Day after tomorrow
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setDate(now.getDate() + 2); // Day after tomorrow
                endDate.setHours(23, 59, 59, 999);
                break;

            // Future: Weekly (Next 7 days)
            case 'futureWeekly':
                startDate = new Date();
                startDate.setDate(now.getDate() + 1); // Tomorrow
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setDate(now.getDate() + 7); // Next 7 days
                endDate.setHours(23, 59, 59, 999);
                break;

            // Future: Monthly (Next 30 days)
            case 'futureMonthly':
                startDate = new Date();
                startDate.setDate(now.getDate() + 1); // Tomorrow
                startDate.setHours(0, 0, 0, 0);

                endDate = new Date();
                endDate.setDate(now.getDate() + 30); // Next 30 days
                endDate.setHours(23, 59, 59, 999);
                break;

            default:
                startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
                endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
        }

        // Create query based on startDate and endDate
        const query = startDate && endDate
            ? { date: { $gte: startDate, $lte: endDate } } // Range-based query
            : {}; // Fetch all if no filter provided

        // Fetch appointments sorted by date in descending order (latest first)
        const appointments = await Appointment.find(query).sort({ date: -1 });

        return res.status(200).json({
            status: "200",
            message: "Get Appointment For Admin Successful",
            appointments,
        });
    } catch (error) {
        console.error("Error in getAppointments_Admin:", error.message);
        res.status(500).json({ message: error.message });
    }
};
//Delete Multipul Appointment Using Filter
 export const deleteAppointments_ByFilter = async (req, res) => {
    const { filter } = req.query; // Extract the filter from query
    const now = new Date(); // Current date and time
    let startDate = null;
    let endDate = null;

    switch (filter) {
        // Present (Today)
        case 'toDay':
            startDate = new Date(now.setHours(0, 0, 0, 0)); // Start of today
            endDate = new Date(now.setHours(23, 59, 59, 999)); // End of today
            break;

        // Past: Last Day
        case 'lastDay':
            startDate = new Date();
            startDate.setDate(now.getDate() - 1); // Start of yesterday
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(now.getDate() - 1); // End of yesterday
            endDate.setHours(23, 59, 59, 999);
            break;

        // Past: Weekly (Last 7 days)
        case 'weekly':
            startDate = new Date();
            startDate.setDate(now.getDate() - 7); // 7 days ago
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setHours(23, 59, 59, 999); // End of today
            break;

        // Past: Monthly (Last 30 days)
        case 'monthly':
            startDate = new Date();
            startDate.setDate(now.getDate() - 30); // 30 days ago
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setHours(23, 59, 59, 999); // End of today
            break;

        // Past: Yearly (Last 365 days)
        case 'yearly':
            startDate = new Date();
            startDate.setDate(now.getDate() - 365); // 365 days ago
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setHours(23, 59, 59, 999); // End of today
            break;

        // Future: Tomorrow
        case 'tomorrow':
            startDate = new Date();
            startDate.setDate(now.getDate() + 1); // Tomorrow
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(now.getDate() + 1); // Tomorrow
            endDate.setHours(23, 59, 59, 999);
            break;

        // Future: Day After Tomorrow
        case 'tomorrowsNextDay':
            startDate = new Date();
            startDate.setDate(now.getDate() + 2); // Day after tomorrow
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(now.getDate() + 2); // Day after tomorrow
            endDate.setHours(23, 59, 59, 999);
            break;

        // Future: Weekly (Next 7 days)
        case 'futureWeekly':
            startDate = new Date();
            startDate.setDate(now.getDate() + 1); // Tomorrow
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(now.getDate() + 7); // Next 7 days
            endDate.setHours(23, 59, 59, 999);
            break;

        // Future: Monthly (Next 30 days)
        case 'futureMonthly':
            startDate = new Date();
            startDate.setDate(now.getDate() + 1); // Tomorrow
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date();
            endDate.setDate(now.getDate() + 30); // Next 30 days
            endDate.setHours(23, 59, 59, 999);
            break;

        default:
            return res.status(400).send('Invalid filter'); // Return error for invalid filter
    }

    // Prepare the query condition
    let query = {};
    if (startDate && endDate) {
        query = { date: { $gte: startDate, $lte: endDate } }; // For present and past
    } else if (startDate) {
        query = { date: { $gte: startDate } }; // For future
    }

    try {
        const result = await Appointment.deleteMany(query); // Delete the matching documents
        res.status(200).json({
            status: "200",
            message: "Appointments deleted successfully",
            deletedCount: result.deletedCount, // Return number of deleted appointments
        });
    } catch (error) {
        console.error("Error deleting appointments:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete a patient's appointment One By One
export const deleteAppointment_oneByOne = async (req, res) => {
        try {
            const { patient,email,number,department,date } = req.body;

            const foundPatient = await Appointment.findOne({ patient,email,number,department,date });
            if (!foundPatient) {
                return res.status(404).json({ status: 404, message: 'Patient not found, Kindly Provide Right Details' });
            }
            const deleteResult = await Appointment.deleteOne({ patient,email,number,department,date });
            if (deleteResult.deletedCount > 0) {
                return res.status(200).json({ status: 200, message: 'Delete Successful' });
            } else {
                return res.status(500).json({ status: 500, message: 'Delete Failed' });
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ status: 500, message: 'Server Error' });
        }
    }

