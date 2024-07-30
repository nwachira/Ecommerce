"use client"

import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products"); 
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return products;
}

export function filterProducts(products: Product[], selectedCategories: string[]) {
    if (selectedCategories.length === 0) {
      return products; // Return all products if no categories are selected
    }
    return products.filter((product) => selectedCategories.includes(product.category));
  }
  

export type { Product }; // Export Product as a named export

export function searchProducts(products: Product[], searchTerm: string) {
    if (searchTerm.trim() === "") {
      return products; // Return all products if search term is empty
    }
  
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
}

// lib/data.ts
export function getProductDetails(id: string, products: Product[]): Product | undefined {
    const idAsNumber = Number(id); // Convert id from string to number
    return products.find((p) => p.id === idAsNumber);
  }
  export function getRelatedProducts(category: string, products: Product[]): Product[] {
    return products.filter((product) => product.category === category);
  }