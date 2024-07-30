"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/cart_button";
import { useContext } from "react";
import { Store } from "@/app/lib/Store";

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

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: { product: Product }) {
  // Check for context value
  const context = useContext(Store);

  if (!context) {
    throw new Error("Store context is undefined. Make sure you are using the StoreProvider.");
  }

  const { state, dispatch } = context;
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.id === product.id
    );

    if (existItem) {
      // If the item exists, update its quantity
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          quantity: 1
        },
      });
    } else {
      // If the item doesn't exist, add it to the cart
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          quantity: 1,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating,
        },
      });
    }
  };
  


  return (
    <div key={product.id} className="border rounded-md shadow-md p-4">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="rounded-md"
        />
      </Link>
      <div className="mt-2">
        <h3 className="text-lg font-medium">{product.title}</h3>
        <p className="text-gray-500">${product.price}</p>
        <Button onClick={addToCartHandler} className="text-sm">
          Add to Cart
        </Button>
        {/* Log the product data to the console */}
        
      </div>
    </div>
  );
}
