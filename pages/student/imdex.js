import useSWR from 'swr'
import { useEffect, useState } from 'react'

const fetcher = url => fetch(url).then(r => r.json())

export default function Student() {
  const [token, setToken] = useState(null)
  useEffect(()=> setToken(localStorage.getItem('tc_token')),[])
  const { data } = useSWR(token ? ['/api/me', token] : null, (url) => fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()))
  return (
    <div style={{maxWidth:900,margin:'40px auto'}}>
      <h2>Student Portal</h2>
      <p>Login as student to view attendance. For demo, create a student and use the login route to get a token.</p>
      <pre>{JSON.stringify(data || {}, null, 2)}</pre>
    </div>
  )
}
