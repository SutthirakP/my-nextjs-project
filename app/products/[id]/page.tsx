'use client';

import { useSearchParams, useRouter } from 'next/navigation'; // ใช้ useSearchParams เพื่อดึง query
import Image from 'next/image';

const ProductDetailPage = () => {
    const searchParams = useSearchParams(); // ใช้เพื่อดึงค่าจาก query parameters
    const router = useRouter(); // ใช้สำหรับการกลับไปยังหน้าก่อนหน้า

    // ดึงค่าจาก query parameters
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const likes = searchParams.get('likes');
    const isNew = searchParams.get('isNew') === 'true'; // แปลงเป็น boolean
    const imageUrl = searchParams.get('imageUrl');

    // ฟังก์ชันสำหรับการกลับไปยังหน้าก่อนหน้า
    const goBack = () => {
        router.back(); // ใช้ router.back() เพื่อกลับไปยังหน้าก่อนหน้า
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <div className="flex flex-col items-center mb-6">
                    <Image
                        src={imageUrl || '/images/default.png'} // ใช้รูป default หากไม่มี imageUrl
                        alt={name || 'Unknown Product'}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-md mb-4"
                    />
                    <h1 className="text-3xl font-bold mb-2">{name || 'Unknown Product'}</h1>
                    <p className="text-lg text-gray-700 font-semibold mb-4">
                        Price: <span className="font-bold text-gray-800">${price || '0'}</span>
                    </p>
                    <p className="text-lg text-gray-700 mb-1">
                        Likes: <span className="font-bold text-gray-800">{likes || '0'} 🫰</span>
                    </p>
                    {isNew && (
                        <div className="bg-green-100 text-green-800 font-bold text-sm px-4 py-2 mt-4 rounded-full shadow-sm">
                            🎉 New Product!
                        </div>
                    )}
                </div>

                {/* ปุ่ม Back */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={goBack} // เรียกฟังก์ชัน goBack เมื่อกดปุ่ม
                        className="mt- px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        ← Back to Products
                    </button>
                </div>

                <div className="text-center mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque urna et magna dictum, in malesuada odio condimentum.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
