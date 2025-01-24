import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
    patient: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['booked', 'completed', 'cancelled'],
        default: 'booked',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('Appointment', AppointmentSchema);
