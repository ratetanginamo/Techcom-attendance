import { connect } from '../../../lib/db'
import User from '../../../models/User'
import Attendance from '../../../models/Attendance'

export default async function handler(req, res) {
  await connect()
  if (req.method !== 'POST') return res.status(405).end()
  const { qrToken } = req.body
  if (!qrToken) return res.status(400).json({ error: 'No qrToken' })
  const user = await User.findOne({ qrToken })
  if (!user) return res.status(404).json({ error: 'Student not found' })
  const att = await Attendance.create({ student: user._id, method: 'qr', meta: { ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress } })
  return res.status(200).json({ ok: true, attendanceId: att._id })
}
