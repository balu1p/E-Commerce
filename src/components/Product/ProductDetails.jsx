import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../http/getAPI';

function ProductDetails() {
  const [liked, setLiked] = useState(false);
  const { product_id } = useParams();

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  
  const {
    data: productData,
    isLoading: productDataIsLoading,
    refetch: productDataRefetch,
  } = useQuery({
    queryKey: ['product-id', product_id],
    queryFn: async () => getProductById(product_id),
  });

  useEffect(()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  },[])

  return (
    <main className="grid place-items-center py-6 lg:py-16 bg-gray-100 min-h-screen">
      <section className="flex flex-col md:flex-row gap-12 lg:gap-16 p-8 lg:p-14 bg-white rounded-lg shadow-2xl w-full max-w-5xl">
        <div className="flex flex-col justify-between text-[#285992] w-full md:w-1/2">
          <img
            src={productData?.data?.image}
            alt={productData?.data?.title}
            className="w-full h-auto object-contain max-h-96 lg:max-h-[600px] rounded-md"
          />
        </div>

        <div className="text-[#285992] w-full md:w-1/2">
          <small className="uppercase text-lg lg:text-xl">
            {productData?.data?.category}
          </small>
          <h3 className="uppercase text-black text-3xl lg:text-5xl font-semibold my-4">
            {productData?.data?.title}
          </h3>
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            ${productData?.data?.price}
          </h3>
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            {productData?.data?.description}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className="bg-[#285992] hover:bg-[#1e4773] transition text-white uppercase px-10 py-4 text-lg lg:text-xl rounded-md shadow-md"
            >
              Add to Cart
            </button>
            <button
              className={`bg-[#285992] hover:bg-[#1e4773] transition text-white uppercase p-4 rounded-md shadow-md ${
                liked ? 'text-red-400' : ''
              }`}
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
