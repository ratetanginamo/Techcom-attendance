import useSWR from 'swr'
import { useState } from 'react'

const fetcher = (url, token) => fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} }).then(r => r.json())

export default function Admin() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('tc_token') : null
  const { data, mutate } = useSWR(['/api/students', token], (url, token) => fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()))
  const [name,setName]=useState(''); const [email,setEmail]=useState('')

  async function create() {
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, email })
    })
    setName(''); setEmail('')
    mutate()
  }

  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h2>Admin</h2>
      <p>Simple admin panel (requires you to be logged in and have admin JWT saved to localStorage as <code>tc_token</code>).</p>

      <div style={{marginTop:20}}>
        <h3>Create Student</h3>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={create}>Create</button>
      </div>

      <div style={{marginTop:20}}>
        <h3>Students</h3>
        <pre>{JSON.stringify(data?.students || [], null, 2)}</pre>
      </div>
    </div>
  )
}
