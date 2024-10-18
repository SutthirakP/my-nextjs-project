import { useState } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component

// Mock product data for now (you can replace this with real data from your state or API)
const initialProducts = [
    { id: 1, name: 'Fender Guitar', price: 300, imageUrl: '/images/guitar.jpg', likes: 20, isNew: true },
    { id: 2, name: 'Yamaha Piano', price: 1200, imageUrl: '/images/piano.jpg', likes: 15, isNew: false },
    // Add more products as needed
];

const ProductList = () => {
    const [products, setProducts] = useState(initialProducts);

    const handleEdit = (id: number) => {
        alert(`Edit product with ID: ${id}`);
        // Implement the edit logic here...
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleUpdate = (id: number) => {
        alert(`Update product with ID: ${id}`);
        // Implement the update logic here...
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        onUpdate={handleUpdate} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
