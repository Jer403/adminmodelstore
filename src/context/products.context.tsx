import { createContext, useEffect, useState } from "react";
import { getAllProductsRequest } from "../api/products";
import { Product } from "../types";

interface ProductContextType {
  products: Product[];
  loadingProducts: boolean;
  updateProduct: (prod: {
    id: string;
    title: string;
    description: string;
    price: number;
  }) => void;
}

interface ProductProviderProps {
  children: import("react").ReactElement;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loadingProducts: true,
  updateProduct: () => {},
});

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const updateProduct = (product: {
    id: string;
    title: string;
    description: string;
    price: number;
  }) => {
    const UpdatedProduct = products.map((p) => {
      if (p.id == product.id)
        return {
          ...p,
          title: product.title,
          description: product.description,
          price: product.price,
        };
      return p;
    });
    setProducts(UpdatedProduct);
  };

  const getProducts = async () => {
    setLoadingProducts(true);
    try {
      console.log("Starting request products");

      const res = await getAllProductsRequest();
      console.log("Response from products: ", res);
      if (res.data.error) throw new Error(res.data.error);
      if (res.status == 200) {
        setProducts(res.data);
      } else {
        setProducts([] as Product[]);
      }
    } catch (error) {
      console.log("Error fetching products data: ", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loadingProducts, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
