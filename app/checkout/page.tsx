"use client"

import React, { useContext, useState } from 'react';
import { Store } from '../lib/Store';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter

const CheckoutPage = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const router = useRouter();

  // State to handle customer details
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle checkout process
  const handleCheckout = () => {
    const checkoutData = {
      customerDetails,
      items: cart.cartItems.map(item => ({
        id: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    console.log('Checkout Data:', checkoutData);
    // Implement the actual checkout logic here, such as sending data to backend
  };

  // Function to format the price
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-screen-lg mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
        {/* Cart Table Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Cart</h1>

          {cart.cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Image</th>
                    <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Product</th>
                    <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Price</th>
                    <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Quantity</th>
                    <th className="border border-gray-300 p-2 text-left text-sm md:text-base">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr key={item.product.id} className="border-b">
                      <td className="border border-gray-300 p-2 text-sm md:text-base">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      </td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base">{item.product.title}</td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base">${formatPrice(item.product.price)}</td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base">{item.quantity}</td>
                      <td className="border border-gray-300 p-2 text-sm md:text-base">
                        ${formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-200">
                  <tr>
                    <td colSpan={4} className="border border-gray-300 p-2 text-right font-bold text-sm md:text-base">Total</td>
                    <td className="border border-gray-300 p-2 font-bold text-sm md:text-base">
                      ${formatPrice(
                        cart.cartItems.reduce(
                          (total, item) => total + item.product.price * item.quantity,
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {cart.cartItems.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
                    onClick={handleCheckout}
                  >
                    Complete Purchase
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Customer Details Section */}
        <div className="w-full md:w-1/3 bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Customer Details</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm md:text-base font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm md:text-base font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={customerDetails.city}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm md:text-base font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={customerDetails.zip}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm md:text-base font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={customerDetails.country}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
