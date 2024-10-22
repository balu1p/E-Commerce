import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { deleteWishlist } from "../redux/slice/WishlistSlice";

function WishList() {
  const dispatch = useDispatch();

  const wishListData = useSelector((state) => state.whishlist.whishListProduct);

  const handleDeleteProduct = (product_id) => {
    dispatch(deleteWishlist({ product_id }));
  };
  return (
    <div className="m-2 lg:mx-5">
      <p className="font-bold">
        My Wishlist{" "}
        <span className="font-normal">{wishListData.length} Items</span>
      </p>
      <div className="flex justify-start gap-4 flex-wrap my-4">
        {wishListData.length > 0 ? (
          wishListData.map((item) => (
            <div
              key={item.product.id}
              className="rounded-lg overflow-hidden transform transition-all duration-300 bg-white shadow-lg relative"
            >
              <div className="absolute top-2 right-2">
                <button onClick={() => handleDeleteProduct(item.product.id)}>
                  <RxCross2 />
                </button>
              </div>

              <Link to={`/product/details/${item.product.id}`}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="lg:mx-3 mt-3 lg:w-56 lg:h-56 object-contain transition-transform duration-300"
                />
                <p className="text-md mx-2">
                  {item.product.title.length > 30
                    ? item.product.title.substring(0, 30) + "..."
                    : item.product.title}
                </p>
              </Link>

              <div className="justify-center mx-2">
                <p className="mb-2 text-2xl space-x-2 text-customRed font-bold">
                  <span>{`$${item.product.price.toFixed(2)}`}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="m-2 flex flex-col justify-center items-center h-screen" style={{
            display: "flex",
            justifyContent: "center !important",
            alignItems: "center",
            minHeight: "100vh",
          }}>
            <p>No Data In Wishlist...</p>
            <Link to='/'>
            <button className="bg-[#285992] text-white py-1 px-4 rounded-sm mt-4">
              Go to Home
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
