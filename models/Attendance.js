import mongoose from 'mongoose'
const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  method: { type: String, enum: ['qr','rfid','manual'], required: true },
  timestamp: { type: Date, default: Date.now },
  meta: { type: Object, default: {} }
})
export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema)
