import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/NavBar.tsx";
import { ProductAdder } from "../pages/ProductAdder.tsx";
import { Toaster } from "sonner";
import { Users } from "../pages/Users.tsx";
import { Payments } from "../pages/Payments.tsx";
import { Products } from "../pages/Products.tsx";
import { Metrics } from "../pages/Metrics.tsx";
import { Chats } from "../pages/Chats.tsx";
import { Beneficiarys } from "../pages/Beneficiarys.tsx";

export function AppRouter() {
  return (
    <Router>
      <Toaster richColors closeButton position="top-right"></Toaster>
      <div className="min-h-[100vh-2rem] w-full flex flex-col items-center mt-8">
        <Navbar />
        <Suspense>
          <Routes>
            <Route path="/" element={<ProductAdder />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/products" element={<Products />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/beneficiarys" element={<Beneficiarys />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
