import Link from 'next/link'

export default function Home() {
  return (
    <div style={{maxWidth:900,margin:'40px auto',fontFamily:'Inter,system-ui'}}>
      <h1>Techcom Attendance</h1>
      <p>Student portal with QR and RFID check-ins.</p>
      <p>
        <Link href="/scan"><a>Open QR Scanner</a></Link> · <Link href="/student"><a>Student Portal</a></Link> · <Link href="/admin"><a>Admin</a></Link>
      </p>
    </div>
  )
  }
