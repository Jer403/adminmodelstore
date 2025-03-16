import { useContext } from "react";
import { PaymentContext } from "../context/payments.context";

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context == undefined) {
    throw new Error("useProduct must be used within aProductProvider");
  }
  return context;
};
