export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    weight?: number;
    rating?: {
      rate: number;
      count: number;
    };
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
  }
  
  export interface User {
    email: string;
    password: string;
    name?: string;
  }