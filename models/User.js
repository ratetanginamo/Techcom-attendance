import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['admin','student'], default: 'student' },
  rfidTag: { type: String, default: '' },
  qrToken: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
})
export default mongoose.models.User || mongoose.model('User', UserSchema)
