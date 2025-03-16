import { usePayment } from "../hooks/usePayment";
import { PaymentInterface } from "../types";
import { createDateTextFromLanguage } from "../utils";

function PaymentCard({ payment }: { payment: PaymentInterface }) {
  return (
    <div className="w-full border-2 bg-white border-gray-400 rounded-lg hover:shadow-lg hover:scale-[101%] transition-[scale,box-shadow] shadow-md p-3 flex flex-row justify-between gap-1 shadow">
      <div className="flex flex-col justify-between items-start text-2xl gap-1">
        <p>
          ID: <span className="ml-2 font-semibold">{payment.id}</span>
        </p>
        <p className="flex justify-start">
          UserID: <span className="ml-2 font-semibold">{payment.userId}</span>
        </p>
        <p className="flex justify-start">
          Price: $<span className="font-semibold">{payment.price}</span>
        </p>
      </div>
      <div className="flex flex-col justify-between items-end gap-1">
        <div
          className={`flex justify-center rounded-md w-48 ${
            payment.state == "1"
              ? "bg-blue-400"
              : payment.state == "2"
              ? "bg-green-400"
              : "bg-red-400"
          }`}
        >
          <p className="text-2xl text-gray-800 p-0.5">
            {payment.state == "1"
              ? "Pending"
              : payment.state == "2"
              ? "Completed"
              : "Failed"}
          </p>
        </div>
        {payment.bookingDate && (
          <p className=" text-2xl">{`Creado el ${createDateTextFromLanguage(
            "es",
            new Date(payment.bookingDate)
          )}`}</p>
        )}

        <p className=" text-2xl">{`Creado el ${createDateTextFromLanguage(
          "es",
          new Date(payment.created_at)
        )}`}</p>
      </div>
    </div>
  );
}

export function Payments() {
  const { payments, loadingPayments } = usePayment();
  return (
    <>
      <div className="w-full max-w-[1330px] p-10 mt-3 gap-4 flex flex-col items-center">
        {loadingPayments ? (
          <span className="text-xl">Cargando pagos...</span>
        ) : payments && payments.length > 0 ? (
          payments.map((payment) => {
            return <PaymentCard payment={payment}></PaymentCard>;
          })
        ) : (
          <span className="text-xl">Cargando pagos...</span>
        )}
      </div>
    </>
  );
}
