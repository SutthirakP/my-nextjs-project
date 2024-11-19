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

  const deleteGuitar = async (id: string) => {
    const response = await fetch(`/api/guitars/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      setGuitars(guitars.filter((guitar) => guitar.id !== id))
    }
  }

  const editGuitar = (id: string, name: string, brand: string, price: number) => {
    console.log('Edit Guitar:', id, name, brand, price)
    // You can navigate to an edit page or open a modal for editing
  }

  return (
    <div className="bg-gradient-to-r  via-teal-100 to-yellow-100 min-h-screen flex items-center justify-center ">
      <div className="container mx-auto p-4">
        {/* Add New Guitar Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-semibold text-yellow-500 mb-4 text-center">Add New Guitar</h1>
          <form onSubmit={addGuitar} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-md transition duration-300"
            >
              Add Guitar
            </button>
          </form>
        </div>

        {/* Guitar List Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4 text-center">Guitar List</h2>
          {guitars.length > 0 ? (
            <ul className="space-y-4">
              {guitars.map((guitar) => (
                <li
                  key={guitar.id}
                  className="p-4 border rounded-lg flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                >
                  <div>
                    <h3 className="text-lg font-bold">{guitar.name}</h3>
                    <p className="text-gray-600">Brand: {guitar.brand}</p>
                    <p className="text-gray-600">Price: ${guitar.price.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md"
                      onClick={() => deleteGuitar(guitar.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md"
                      onClick={() => editGuitar(guitar.id, guitar.name, guitar.brand, guitar.price)}
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No guitars available. Add a new one!</p>
          )}
        </div>
      </div>
    </div>
  )
}
