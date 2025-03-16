import { createContext, useEffect, useState } from "react";
import { getPurchasesRequest } from "../api/products";
import { PurchasesInterface } from "../types";

interface PurchasesContextType {
  purchases: PurchasesInterface[] | null;
  loadingPurchases: boolean;
}

interface PurchasesProviderProps {
  children: import("react").ReactElement;
}

export const PurchasesContext = createContext<PurchasesContextType>({
  purchases: null,
  loadingPurchases: true,
});

export function PurchasesProvider({ children }: PurchasesProviderProps) {
  const [purchases, setPurchases] = useState<PurchasesInterface[] | null>(null);
  const [loadingPurchases, setLoadingPurchases] = useState(true);

  const getPurchasess = async () => {
    setLoadingPurchases(true);
    try {
      console.log("Starting request Purchasess");

      const res = await getPurchasesRequest();
      console.log("Response from Purchasess: ", res);
      if (res.data.error) throw new Error(res.data.error);
      if (res.status == 200) {
        setPurchases(res.data);
      } else {
        setPurchases([] as PurchasesInterface[]);
      }
    } catch (error) {
      console.log("Error fetching Purchasess data: ", error);
    } finally {
      setLoadingPurchases(false);
    }
  };

  useEffect(() => {
    getPurchasess();
  }, []);

  return (
    <PurchasesContext.Provider value={{ purchases, loadingPurchases }}>
      {children}
    </PurchasesContext.Provider>
  );
}
