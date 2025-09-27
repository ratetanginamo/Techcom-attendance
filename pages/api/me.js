import { connect } from '../../lib/db'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Attendance from '../../models/Attendance'
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this'

export default async function handler(req, res) {
  await connect()
  const auth = req.headers.authorization?.split(' ')[1]
  if (!auth) return res.status(401).json({ error: 'Missing token' })
  try {
    const payload = jwt.verify(auth, JWT_SECRET)
    const user = await User.findById(payload.sub).select('-passwordHash')
    if (!user) return res.status(404).json({ error: 'User not found' })
    const recent = await Attendance.find({ student: user._id }).sort({ timestamp: -1 }).limit(20)
    return res.status(200).json({ user, attendance: recent })
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
