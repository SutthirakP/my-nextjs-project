"use client";

import Link from "next/link";

const STYLE = `border-2 border-black mx-1 p-1 drop-shadow-md rounded-md`;

export default function GuitarItem({
  index,
  id,
  name,
  brand,
  price,
  deleteGuitar,
  editGuitar,
}: {
  index: number;
  id: string;
  name: string;
  brand: string;
  price: number;
  deleteGuitar: (id: string) => void;
  editGuitar: (id: string, name: string, brand: string, price: number) => void;
}) {
  return (
    <div key={id} className="p-4 border rounded-md shadow-md">
      <p>
        <strong>{index + 1}:</strong> {name} - {brand} (${price.toFixed(2)})
      </p>

      <div className="flex space-x-2 mt-2">
        <button
          className={STYLE}
          onClick={() => deleteGuitar(id)}
        >
          Delete
        </button>

        <Link
          className={STYLE}
          href={{
            pathname: "/sample_db/guitars/edit",
            query: { id, name, brand, price: price.toString() },
          }}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
