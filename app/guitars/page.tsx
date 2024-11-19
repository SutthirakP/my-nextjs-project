'use client'

import { useState, useEffect } from 'react'
import { z } from 'zod'

const GuitarSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Price must be greater than 0'),
})

interface Guitar {
  id: string
  name: string
  brand: string
  price: number
}

export default function GuitarPage() {
  const [guitars, setGuitars] = useState<Guitar[]>([])
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGuitars = async () => {
      const response = await fetch('/api/guitars')
      const data = await response.json()
      setGuitars(data)
    }
    fetchGuitars()
  }, [])

  const addGuitar = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate input ด้วย Zod
    const parsed = GuitarSchema.safeParse({
      name,
      brand,
      price: parseFloat(price),
    })

    if (!parsed.success) {
      setError(parsed.error.errors[0].message) // แสดงข้อความ Error
      return
    }

    const response = await fetch('/api/guitars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsed.data),
    })

    if (response.ok) {
      const newGuitar = await response.json()
      setGuitars([...guitars, newGuitar])
      setName('')
      setBrand('')
      setPrice('')
      setError(null) // เคลียร์ Error
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Guitar List</h1>

      {/* ฟอร์มสำหรับเพิ่ม Guitar ใหม่ */}
      <form onSubmit={addGuitar} className="mb-4">
        {error && <p className="text-red-500 mb-2">{error}</p>} {/* แสดงข้อความ Error */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Guitar
        </button>
      </form>

      {/* แสดงรายการ Guitar */}
      <ul className="space-y-4">
        {guitars.map((guitar) => (
          <li key={guitar.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{guitar.name}</h2>
            <p>Brand: {guitar.brand}</p>
            <p>Price: ${guitar.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
