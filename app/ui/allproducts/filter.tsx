"use client";

import { useState, useEffect } from "react";
import { filterProducts } from "@/app/lib/data";
import useProducts from "@/app/lib/data";
import ProductCard from "@/app/ui/card/productcard/page";
import { useRouter } from "next/navigation";
import { FaFilter, FaTimes } from "react-icons/fa";


const ITEMS_PER_PAGE = 10; // Adjust as needed

export default function Filter() {
  const router = useRouter();
  const products = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const updateFilteredProducts = () => {
      setFilteredProducts(filterProducts(products, selectedCategories));
    };

    updateFilteredProducts();
  }, [products, selectedCategories]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`?page=${page}`);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const isMobile = windowWidth < 670;
  const isTabletOrSmallScreen = windowWidth < 1024;

  return (
    <div className="flex flex-col md:flex-row relative">
      <div className={`block sm:hidden fixed top-0 left-0 p-4 z-20`}>
        <button onClick={() => setShowFilters(!showFilters)} className="flex">
          <FaFilter className="text-2xl" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen bg-white z-10 transition-transform duration-300 ease-in-out ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-40 md:h-auto md:flex md:flex-col`}
      >
        <div className="flex justify-between items-center mb-4 p-2 md:hidden">
          <h2 className="text-lg font-bold">Filter Products</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-2xl"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-2 ">
          {Array.from(new Set(products.map((product) => product.category))).map(
            (category) => (
              <div key={category} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category} className="ml-2">
                  <span>{category}</span>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      <div
        className={`flex-grow ${
          !isTabletOrSmallScreen ? 'md:ml-40' : ''
        } overflow-y-auto p-4`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <ul className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`rounded-md px-3 py-1 ${
                      currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
