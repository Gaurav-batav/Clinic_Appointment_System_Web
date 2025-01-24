import { Schema, model } from 'mongoose';

// Patient Schema
const PatientSchema = new Schema({
    patient: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default model('Patient', PatientSchema);
