import Appointment from '../schema/Appointment.js';

export const loginPatient = async (req, res) => {
    try {
        const { email, number } = req.body;
        const appointments = await Appointment.find({ email, number });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the user' });
        }

        return res.status(200).json({ status: "200", message: "Login Successful", appointments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

