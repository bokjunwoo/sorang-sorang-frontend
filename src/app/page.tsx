'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
        .then(res => res.text())
        .then(data => {
          setMessage(data)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{message}</h1>
      </main>
  )
}