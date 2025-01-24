import { Schema, model } from 'mongoose';

const DoctorSchema = new Schema({
    doctor: {
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
        enum: ['General Physician','Cardiology','Dermatology','Gynecology','Neurology','Radiology'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model('Doctor', DoctorSchema);

