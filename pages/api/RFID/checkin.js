import { connect } from '../../../lib/db'
import User from '../../../models/User'
import Attendance from '../../../models/Attendance'

export default async function handler(req, res) {
  await connect()
  if (req.method !== 'POST') return res.status(405).end()
  const { tagId, secret } = req.body
  // Optional: verify a shared secret for security
  if (process.env.RFID_SHARED_SECRET && secret !== process.env.RFID_SHARED_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' })
  }
  if (!tagId) return res.status(400).json({ error: 'Missing tagId' })
  const user = await User.findOne({ rfidTag: tagId })
  if (!user) return res.status(404).json({ error: 'Student not found' })
  const att = await Attendance.create({ student: user._id, method: 'rfid', meta: { tagId } })
  return res.status(200).json({ ok: true, attendanceId: att._id, student: user.name })
}
