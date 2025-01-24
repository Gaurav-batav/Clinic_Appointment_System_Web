import Doctor from '../schema/Doctor.js';

// Get all doctors
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ message: "Get Doctors Successful", doctors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Add a new doctor
export const addDoctor = async (req, res) => {
    const { doctor, email, number, department } = req.body;

    if (!doctor || !email || !number || !department) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newDoctor = await Doctor.create({ doctor, email, number, department });
        res.status(201).json({ message: "Add Doctor Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
    const { doctor, email, number, department } = req.body;

    if (!doctor || !email || !number || !department) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const foundDoctor = await Doctor.findOne({ doctor, email, number, department });
        if (!foundDoctor) {
            return res.status(404).json({ message: "Doctor Not Found. Kindly provide correct details" });
        }

        const deleteResult = await Doctor.deleteOne({ doctor, email, number, department });
        if (deleteResult.deletedCount > 0) {
            return res.status(200).json({ message: "Delete Successful" });
        } else {
            return res.status(500).json({ message: "Delete Failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
