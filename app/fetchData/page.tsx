'use client'
import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
}

export default function FetchDataPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vercelResponse, titleResponse] = await Promise.all([
                    fetch('/api/vercel'),
                    fetch('https://jsonplaceholder.typicode.com/photos')
                ]);

                if (!vercelResponse.ok || !titleResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const vercelData = await vercelResponse.json();
                const titleData = await titleResponse.json();

                // Set data from Vercel API
                setPosts(vercelData);

                // Set titles from Typicode API (first 10 titles as an example)
                setTitles(titleData.slice(0, 10).map((item: any) => item.title));
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-2 text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p className="text-xl font-semibold">Error</p>
                    <p className="mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                                    {post.author[0]}
                                </div>
                                <div className="ml-4">
                                    <p className="text-lg font-bold text-gray-900">{post.author}</p>
                                    <p className="text-sm text-gray-500">@{post.author.replace(/\s+/g, '')}</p>
                                </div>
                            </div>

                            {/* Title จาก Typicode */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {titles[index] || 'No title'}
                            </h3>

                            <p className="text-gray-700 text-sm mt-2 mb-6">
                                {post.content}
                            </p>

                            <div className="text-sm text-gray-500 flex items-center justify-between">
                                <time>{post.date}</time>
                                <a href="#" className="text-blue-600 hover:underline">
                                    View
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
