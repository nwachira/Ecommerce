"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Product, getProductDetails, getRelatedProducts } from "@/app/lib/data";
import useProducts from "@/app/lib/data";
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


export default function ProductDetails() {
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
  


  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const allProducts = useProducts();
  const [showCartButton, setShowCartButton] = useState(false); // State for cart button visibility

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      try {
        // Wait for products to be available
        if (allProducts) {
          const fetchedProduct = getProductDetails(id, allProducts);

          if (fetchedProduct) {
            setProduct(fetchedProduct);
            // Fetch related products based on the fetched product's category
            setRelatedProducts(getRelatedProducts(fetchedProduct.category, allProducts));
          } else {
            console.error(`Product with ID ${id} not found.`);
          }
        } else {
          console.error("All products not loaded yet.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/404");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, allProducts, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-md"
            onMouseEnter={() => setShowCartButton(true)}
            onMouseLeave={() => setShowCartButton(false)}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
          <p className="text-gray-600 mb-4">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
          {/* Add to Cart button (hidden by default) */}
          {showCartButton && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/all-products">
                <Button className="text-sm">Add to Cart</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Display related products */}
      <h2 className="text-2xl font-bold mt-8">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
            <div className="border rounded-md shadow-md p-4">
              <div className="relative h-48"> {/* Fixed height container */}
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  layout="fill" // Fill the container
                  objectFit="cover" // Cover the container with the image
                  className="rounded-md"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             
                <Button className="text-sm" onClick={addToCartHandler}>Add to Cart</Button>
              
            </div>
              

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
