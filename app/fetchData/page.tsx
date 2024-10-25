'use client'

import { useEffect, useState } from 'react';

export default function FetchData() {
  const [vercelData, setVercelData] = useState([]);
  const [photoTitles, setPhotoTitles] = useState<string[]>([]);

  useEffect(() => {
    async function fetchVercelData() {
      try {
        const response = await fetch('/api/vercel');
        const data = await response.json();
        setVercelData(data);
      } catch (err) {
        console.error('Error fetching Vercel data:', err);
      }
    }

    async function fetchTypicodeTitles() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data: { title: string }[] = await response.json();
        const titles = data.map((item) => item.title);
        setPhotoTitles(titles);
      } catch (err) {
        console.error('Error fetching Typicode titles:', err);
      }
    }

    fetchVercelData();
    fetchTypicodeTitles();
  }, []);

  if (!vercelData.length || !photoTitles.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Data from Vercel & Typicode</h1>

      {/* Vercel Blog Data */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vercel Blog Data:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vercelData.map((item: any, index: number) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <p className="font-medium text-gray-700">{item.author}</p>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typicode Photo Titles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Typicode Photo Titles:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photoTitles.slice(0, 20).map((title, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <p className="text-gray-700">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
