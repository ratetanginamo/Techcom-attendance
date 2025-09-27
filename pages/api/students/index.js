import { connect } from '../../../lib/db'
import User from '../../../models/User'
import Attendance from '../../../models/Attendance'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this'

export default async function handler(req, res) {
  await connect()
  const auth = req.headers.authorization?.split(' ')[1]
  let isAdmin = false
  if (auth) {
    try {
      const payload = jwt.verify(auth, JWT_SECRET)
      isAdmin = payload.role === 'admin'
    } catch (e) {}
  }
  if (!isAdmin) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    const students = await User.find({ role: 'student' }).select('-passwordHash')
    return res.status(200).json({ students })
  }

  if (req.method === 'POST') {
    const { name, email, password, rfidTag } = req.body
    if (!name || !email) return res.status(400).json({ error: 'Missing fields' })
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email exists' })
    const passwordHash = password ? await require('bcryptjs').hash(password, 10) : undefined
    const qrToken = require('nanoid').nanoid(20)
    const student = await User.create({ name, email, passwordHash, role: 'student', rfidTag, qrToken })
    return res.status(201).json({ student })
  }

  res.status(405).end()
}
