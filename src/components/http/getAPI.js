import axios from "axios";

export async function getAllProducts() {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);

    return response;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data. Please try again later.");
  }
}

export async function getAllCategories() {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/categories`
    );

    return response;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching category data:", error);
    throw new Error("Failed to fetch category data. Please try again later.");
  }
}

export async function getCategory(category) {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );

    return response;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching category data:", error);
    throw new Error("Failed to fetch category data. Please try again later.");
  }
}

export async function getProductsBySearch(searchText) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    const products = response?.data;

    const filteredProducts = products?.filter((product) =>
      matchesSearchText(product, searchText)
    );

    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products. Please try again later.");
  }
}

// Helper function to match search text across multiple fields
function matchesSearchText(product, searchText) {
  const lowerCaseSearchText = searchText.toLowerCase();

  return (
    product?.title?.toLowerCase().includes(lowerCaseSearchText) ||
    product?.description?.toLowerCase().includes(lowerCaseSearchText) ||
    product?.category?.toLowerCase().includes(lowerCaseSearchText)
  );
}

export async function getProductById(product_id) {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${product_id}`
    );

    return response;
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data. Please try again later.");
  }
}
