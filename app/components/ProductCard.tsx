import Image from 'next/image';
import { useRouter } from 'next/router';

// Define the Product interface
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    likes: number;
    isNew: boolean;
}

// Define the component props interface
interface ProductCardProps {
    product: Product; 
    onUpdate: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onEdit, onDelete }) => {
    const router = useRouter();

    // Function to navigate to the detail page
    const goToDetails = () => {
        router.push(`/parmes/${product.id}`);
    };

    return (
        <div className="border rounded-lg p-4 m-2 bg-white shadow-md relative">
            {/* Image clickable to go to details */}
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={150}
                className="rounded cursor-pointer"
                onClick={goToDetails} // Click on image to go to details
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            
            {/* Price and likes row */}
            <div className="flex justify-between items-center">
                <p className="text-md text-gray-700">${product.price}</p>
                <p className="text-sm text-gray-500">{product.likes} 👍</p>
            </div>
            
            {product.isNew && <span className="text-green-500 font-semibold">🎉 New!</span>}
            
            {/* Buttons for Edit, Update, and Delete */}
            <div className="mt-2 flex justify-between items-center">
                <button 
                    onClick={() => onEdit(product.id)}  // Pass product id
                    className="text-blue-500 text-sm hover:underline"
                >
                    Edit
                </button>
                <button 
                    onClick={() => onUpdate(product.id)}  // Pass product id
                    className="text-yellow-500 text-sm hover:underline"
                >
                    Update
                </button>
                <button 
                    onClick={() => onDelete(product.id)}  // Pass product id
                    className="text-red-500 text-sm hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
    