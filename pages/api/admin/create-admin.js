import { connect } from '../../../lib/db'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  await connect()
  if (req.method !== 'POST') return res.status(405).end()
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return res.status(500).json({ error: 'Admin env not configured' })
  const existing = await User.findOne({ email })
  if (existing) return res.status(200).json({ ok: true, message: 'Admin exists' })
  const pw = await bcrypt.hash(password, 10)
  await User.create({ name: 'Admin', email, passwordHash: pw, role: 'admin' })
  return res.status(201).json({ ok: true })
}
