import { createContext, useEffect, useState } from "react";
import { getPaymentsRequest } from "../api/products";
import { PaymentInterface } from "../types";

interface PaymentContextType {
  payments: PaymentInterface[] | null;
  loadingPayments: boolean;
}

interface PaymentProviderProps {
  children: import("react").ReactElement;
}

export const PaymentContext = createContext<PaymentContextType>({
  payments: null,
  loadingPayments: true,
});

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [payments, setPayments] = useState<PaymentInterface[] | null>(null);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const getPayments = async () => {
    setLoadingPayments(true);
    try {
      console.log("Starting request Payments");

      const res = await getPaymentsRequest();
      console.log("Response from Payments: ", res);
      if (res.data.error) throw new Error(res.data.error);
      if (res.status == 200) {
        setPayments(res.data);
      } else {
        setPayments([] as PaymentInterface[]);
      }
    } catch (error) {
      console.log("Error fetching Payments data: ", error);
    } finally {
      setLoadingPayments(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <PaymentContext.Provider value={{ payments, loadingPayments }}>
      {children}
    </PaymentContext.Provider>
  );
}
