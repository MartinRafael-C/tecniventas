import { ReactNode } from "react";

export interface Product {
    stock: ReactNode;
    thumbnail: string;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    weight?: number;
    rating: number;
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