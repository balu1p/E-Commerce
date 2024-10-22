import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getCategory, getProductsBySearch } from "../http/getAPI";
import { useQuery } from "@tanstack/react-query";
import { BsBoxArrowInRight, BsChatLeftText } from "react-icons/bs";
import { MdOutlineDeveloperMode } from "react-icons/md";

function ProductList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categories");
  const search = searchParams.get("search");
 
  const { data: productCategory, isLoading: productCategoryIsLoading } =
    useQuery({
      queryKey: ["filter-category", category],
      queryFn: () => getCategory(category),
    });

    const { data: productSearch, isLoading: productSearchIsLoading } =
    useQuery({
      queryKey: ["search", search],
      queryFn: () => getProductsBySearch(search),
    });

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State for filters
  const [priceRange, setPriceRange] = useState([0, 500]); // Min and max price
  const [ratingFilter, setRatingFilter] = useState(0); // Minimum rating

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


  // Filter products based on price and rating
  const filteredProducts =
  productCategory?.data?.length > 0
    ? productCategory.data.filter((product) => {
        const { price, rating } = product;
        const { rate } = rating;
        return (
          price >= priceRange[0] &&
          price <= priceRange[1] &&
          rate >= ratingFilter
        );
      })
    : productSearch?.filter((product) => {
        const { price, rating } = product;
        const { rate } = rating;
        return (
          price >= priceRange[0] &&
          price <= priceRange[1] &&
          rate >= ratingFilter
        );
      });


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed top-16 bottom-0 left-0 w-64 bg-gray-100 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:w-72`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">Filter Products</h1>
        </div>

        {/* Filters: Price and Rating */}
        <div className="p-4">
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="w-full mt-2"
            />
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full mt-2"
            />
          </div>

          {/* Rating Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Minimum Rating ({ratingFilter} Stars)
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-[14px] right-14 z-50 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <MdOutlineDeveloperMode className="text-2xl" />
      </button>

      {/* Product List */}
      <div className="ml-0 p-4">
        {productCategoryIsLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold">
                    {product.title.length > 30
                      ? product.title.substring(0, 30) + "..."
                      : product.title}
                  </h3>
                  <p className="text-xl text-red-500 font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: {product.rating.rate} / 5
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
