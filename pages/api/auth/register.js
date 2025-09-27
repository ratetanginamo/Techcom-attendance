import { connect } from '../../../lib/db'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

export default async function handler(req, res) {
  await connect()
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password } = req.body
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ error: 'User exists' })
  const passwordHash = password ? await bcrypt.hash(password, 10) : null
  const qrToken = nanoid(20)
  const user = await User.create({ name, email, passwordHash, role: 'student', qrToken })
  return res.status(201).json({ userId: user._id, qrToken })
}
