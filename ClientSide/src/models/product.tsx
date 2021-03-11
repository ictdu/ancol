export interface Product {
    id: string;
    name: string;
    stocks: number;
    description: string;
    price: number;
    imagePath: string;
    createdAt: Date;
}

export interface ProductFormValues {
    id?: string;
    name: string;
    stocks: number;
    description: string;
    price: number;
}