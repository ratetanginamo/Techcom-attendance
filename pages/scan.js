import { useState } from 'react'
import QRCode from 'qrcode'

export default function Scan() {
  const [result, setResult] = useState('')
  const [qrExample, setQrExample] = useState('')

  async function createExample() {
    // Generates an example QR code data-url for demonstration (a check-in URL)
    const token = 'demo-qr-token'
    const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/attendance/check-qr` // not direct URL for scanning; in real life encode token URL
    const data = `${token}`
    const dataUrl = await QRCode.toDataURL(data)
    setQrExample(dataUrl)
  }

  async function handleFile(e) {
    // for demo we accept a plain token in a text file or image scanning libraries can be integrated
    const f = e.target.files?.[0]
    if (!f) return
    // Simple: if it's a text file, read token
    if (f.type === 'text/plain') {
      const txt = await f.text()
      setResult(`Read token from file: ${txt}`)
      // Optionally call API to check-in
    } else {
      setResult('File uploaded (image). For real scanning, integrate a camera scanner library like html5-qrcode.')
    }
  }

  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h2>QR Scanner (Demo)</h2>
      <p>This starter uses a simple file input for demo scanning. For production, integrate a camera QR scanner (e.g., <code>html5-qrcode</code>).</p>
      <input type="file" accept="image/*,text/plain" onChange={handleFile} />
      <div style={{marginTop:20}}>
        <button onClick={createExample}>Generate demo QR image</button>
      </div>

      {qrExample && <div style={{marginTop:16}}>
        <img src={qrExample} alt="demo qr" style={{maxWidth:240}} />
        <div>Scan the demo image with your real scanner or camera.</div>
      </div>}

      <pre style={{marginTop:12, background:'#f4f4f4', padding:12}}>{result}</pre>
    </div>
  )
}
