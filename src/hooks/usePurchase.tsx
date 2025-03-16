import { useContext } from "react";
import { PurchasesContext } from "../context/purchases.context";

export const usePurchase = () => {
  const context = useContext(PurchasesContext);
  if (context == undefined) {
    throw new Error("useProduct must be used within aProductProvider");
  }
  return context;
};
