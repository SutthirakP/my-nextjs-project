'use client'

import { useState, useEffect } from 'react'

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
    const response = await fetch('/api/guitars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, brand, price: parseFloat(price) }),
    })

    if (response.ok) {
      const newGuitar = await response.json()
      setGuitars([...guitars, newGuitar])
      setName('')
      setBrand('')
      setPrice('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Add New Guitar</h1>
        <form onSubmit={addGuitar} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded transition duration-300"
          >
            Add Guitar
          </button>
        </form>
      </div>

      {/* Display Guitar List */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-lg mt-12 mx-4">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Guitar List</h2>
        <ul className="space-y-4">
          {guitars.map((guitar) => (
            <li key={guitar.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{guitar.name}</h3>
              <p>Brand: {guitar.brand}</p>
              <p>Price: ${guitar.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
