// app/types.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    likes: number;
    isNew: boolean;
    imageUrl: string; // Ensure this matches the property you use
}
