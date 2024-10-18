// app/components/AddProductForm.tsx
import { useState } from 'react';

// Define the Product type
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    likes: number;
    isNew: boolean;
}

// Define the props type
interface AddProductFormProps {
    onAddProduct: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0, // Placeholder, will be set when added
        name: '',
        price: 0,
        imageUrl: '',
        likes: 0,
        isNew: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'likes' ? parseInt(value) : value,
        }));
    };

    const addProduct = () => {
        if (!newProduct.name || newProduct.price <= 0 || !newProduct.imageUrl) {
            alert("Please fill all fields correctly!");
            return;
        }

        onAddProduct({
            ...newProduct,
            id: Date.now(), // Simple ID generation using timestamp
        });
        setNewProduct({ id: 0, name: '', price: 0, imageUrl: '', likes: 0, isNew: false });
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Add a New Product</h2>
            <div className="flex flex-wrap mb-4 space-x-2">
                <input 
                    type="text" 
                    name="name" 
                    value={newProduct.name} 
                    onChange={handleChange} 
                    placeholder="Product Name" 
                    className="border-2 border-gray-300 p-2 rounded w-full md:w-1/4 mb-2"
                />
                <input 
                    type="number" 
                    name="price" 
                    value={newProduct.price} 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="border-2 border-gray-300 p-2 rounded w-32 mb-2"
                />
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={newProduct.imageUrl} 
                    onChange={handleChange} 
                    placeholder="Image URL" 
                    className="border-2 border-gray-300 p-2 rounded w-full md:w-1/4 mb-2"
                />
                <input 
                    type="number" 
                    name="likes" 
                    value={newProduct.likes} 
                    onChange={handleChange} 
                    placeholder="Likes" 
                    className="border-2 border-gray-300 p-2 rounded w-32 mb-2"
                />
            </div>
            <button 
                onClick={addProduct} 
                className="mt-2 px-4 py-2 bg-[#333] text-white rounded hover:bg-gray-700"
            >
                Add Product
            </button>
        </div>
    );
};

export default AddProductForm;
