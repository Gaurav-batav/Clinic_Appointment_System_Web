import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
    admin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default model('Admin', AdminSchema);