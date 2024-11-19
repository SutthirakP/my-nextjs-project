"use client"

import Link from "next/link";
const STYLE_BUTTON = `px-4 py-1 text-white rounded transition`;
const STYLE_CHECKBOX = `h-5 w-5 cursor-pointer`;

export default function TodoItem({ index, id, title, done, deleteTask, toggleTask }: {
    index: number;
    id: string;
    title: string;
    done: boolean;
    deleteTask: (id: string) => void;
    toggleTask: (id: string, done: boolean) => void;
}) {
    return (
        <div key={id} className="flex items-center justify-between p-4 bg-white rounded shadow mb-2">
            <div className="flex items-center space-x-4">
                <span>{index + 1}:</span>
                <span className={`font-semibold ${done ? 'line-through text-gray-500' : ''}`}>
                    {title}
                </span>
            </div>

            <div className="flex space-x-2">
                <input
                    className={STYLE_CHECKBOX}
                    type="checkbox"
                    defaultChecked={done}
                    onClick={() => toggleTask(id, !done)}
                />
                <button
                    className={`${STYLE_BUTTON} bg-red-500 hover:bg-red-600`}
                    onClick={() => deleteTask(id)}
                >
                    Delete
                </button>
                <Link
                    className={`${STYLE_BUTTON} bg-blue-500 hover:bg-blue-600`}
                    href={{
                        pathname: '/sample_db/edit',
                        query: { id, title },
                    }}
                >
                    Edit
                </Link>
            </div>
        </div>
    )
}
