'use client';

import React, { useState } from 'react';
import Image from 'next/image'; 
import { Product } from './types'; 
import Link from 'next/link'; // Import Link for navigation

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: "Fender Guitar", price: 300, likes: 20, isNew: true, imageUrl: "/images/fender-guitar.png" },
        { id: 2, name: "Yamaha Piano", price: 800, likes: 15, isNew: false, imageUrl: "/images/yamaha-piano.png" },
        { id: 3, name: "Gibson Guitar", price: 1500, likes: 30, isNew: true, imageUrl: "/images/gibson-guitar.png" },
        { id: 4, name: "Roland Keyboard", price: 600, likes: 25, isNew: false, imageUrl: "/images/roland-keyboard.png" },
        { id: 5, name: "Drum Kit", price: 400, likes: 10, isNew: false, imageUrl: "/images/drum-kit.png" },
        { id: 6, name: "Violin", price: 700, likes: 18, isNew: false, imageUrl: "/images/violin.png" },
        { id: 7, name: "Trumpet", price: 200, likes: 5, isNew: true, imageUrl: "/images/trumpet.png" },
        { id: 8, name: "Flute", price: 250, likes: 12, isNew: false, imageUrl: "/images/flute.png" },
    ]);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [likes, setLikes] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProductId, setEditingProductId] = useState<number | null>(null);

    const addProduct = () => {
        if (name && price && url && likes) {
            const newProduct: Product = {
                id: products.length + 1,
                name,
                price: Number(price),
                likes: Number(likes),
                isNew: true,
                imageUrl: url,
            };
            setProducts([...products, newProduct]);
            clearForm();
        }
    };

    const handleEdit = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setName(product.name);
            setPrice(String(product.price));
            setUrl(product.imageUrl);
            setLikes(String(product.likes));
            setEditingProductId(productId);
        }
    };

    const handleUpdate = () => {
        setProducts(products.map(product => 
            product.id === editingProductId 
            ? { ...product, name, price: Number(price), imageUrl: url, likes: Number(likes), isNew: true } 
            : product
        ));
        setEditingProductId(null);
        clearForm();
    };

    const handleDelete = (productId: number) => {
        setProducts(products.filter(product => product.id !== productId));
    };

    const clearForm = () => {
        setName('');
        setPrice('');
        setUrl('');
        setLikes('');
        setEditingProductId(null);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                {editingProductId ? "Edit Product" : "Add a New Product"}
            </h2>
            <div className="flex mb-6 space-x-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="border-2 border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="border-2 border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Image URL"
                    className="border-2 border-gray-300 p-2 rounded mb-2 w-full"
                />
                <input
                    type="number"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    placeholder="Likes"
                    className="border-2 border-gray-300 p-2 rounded mb-2 w-full"
                />
                <button
                    onClick={editingProductId ? handleUpdate : addProduct}
                    className="bg-gray-800 text-white py-2 px-4 rounded"
                >
                    {editingProductId ? "Update Product" : "Add Product"}
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products"
                    className="border-2 border-gray-300 p-2 rounded w-full"
                />
            </div>

            <h2 className="text-2xl font-bold mb-4">Our Instruments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 bg-white relative">
                        <Link 
                            href={`/products/${product.id}?name=${product.name}&price=${product.price}&likes=${product.likes}&isNew=${product.isNew}&imageUrl=${product.imageUrl}`} 
                            passHref
                        >
                            <div className="cursor-pointer">
                                <Image 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    width={200} 
                                    height={200} 
                                    className="rounded-t-lg object-cover h-48 w-full" 
                                />
                            </div>
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700">Price: <span className="font-bold">${product.price}</span></p>
                            <p className="text-gray-700">Likes: <span className="font-bold">{product.likes} 🫰</span></p>
                            {product.isNew && (
                                <span className="absolute top-2 right-2 bg-green-200 text-green-800 font-bold text-sm px-2 py-1 rounded-full shadow-md animate-bounce">
                                    🎉 New!
                                </span>
                            )}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop click event from propagating
                                    handleEdit(product.id);
                                }}
                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-all"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Stop click event from propagating
                                    handleDelete(product.id);
                                }}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
