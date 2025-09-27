# Techcom Attendance — Student Portal (QR + RFID)

Starter attendance system & student portal with:
- QR check-ins (token-based)
- RFID webhook check-in support (POST from hardware)
- Admin panel to create students
- Student portal to view attendance

## Features
- Next.js frontend + API routes
- MongoDB (Atlas recommended) with Mongoose
- Simple JWT auth
- QR token per student (use QR libraries to generate/scan)
- RFID webhook: `/api/rfid/checkin` accepts `{ tagId, secret }`

## Quick start (local)
1. Clone
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill values (MONGODB_URI, JWT_SECRET, NEXT_PUBLIC_BASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD)
4. `npm run dev`
5. Create admin: POST to `/api/admin/create-admin` (call once) or run the endpoint in browser
6. Use the Admin page to create students.

## RFID integration
Your RFID reader (e.g., Raspberry Pi + USB RFID or a networked reader) should POST to:
