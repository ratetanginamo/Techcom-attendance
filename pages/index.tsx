import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">
      <h1 className="text-3xl font-bold mb-3">Techcom Attendance</h1>
      <p className="text-gray-600 mb-6">
        Student portal with QR and RFID check-ins.
      </p>
      <div className="space-y-3">
        <Link href="/qr-scanner" className="block bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Open QR Scanner
        </Link>
        <Link href="/student" className="block bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Student Portal
        </Link>
        <Link href="/admin" className="block bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition">
          Admin
        </Link>
      </div>
    </div>
  )
}
