import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Mock data for the sake of example
const mockProductData = [
    { id: 1, name: 'Fender Guitar', price: 300, imageUrl: '/images/guitar.jpg', likes: 20, isNew: true },
    { id: 2, name: 'Yamaha Piano', price: 1200, imageUrl: '/images/piano.jpg', likes: 15, isNew: false },
    // More products...
];

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Get the product ID from the URL
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (id) {
            // Find the product by ID
            const foundProduct = mockProductData.find((item) => item.id === parseInt(id as string));
            setProduct(foundProduct);
        }
    }, [id]);

    if (!product) {
        return <p>Loading...</p>; // Show loading while fetching product data
    }

    return (
        <div className="p-4">
            <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
                ← Back to products
            </button>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className="w-full max-w-md mt-4 rounded shadow-lg" />
            <p className="mt-2 text-lg">Price: ${product.price}</p>
            <p className="text-md text-gray-500">{product.likes} likes</p>
            {product.isNew && <p className="text-green-500 mt-2">🎉 This is a new product!</p>}
        </div>
    );
};

export default ProductDetail;