import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/http";
import NewHeroSection from "./components/Pages/Carousal/NewHeroSection";
import ProductList from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import { Provider } from "react-redux";
import { persistor, store } from "./components/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import WishList from "./components/Product/WishList";

const AppLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Header />
            <Outlet />
            <Footer />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <WrongParamsPage />,

    children: [
      { path: "/", element: <NewHeroSection /> },
      { path: "/product/filter", element: <ProductList /> },
      { path: "/product/details/:product_id", element: <ProductDetails /> },
      { path: "/product/wishlist", element: <WishList /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
