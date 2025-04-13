import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white rounded-lg shadow-gray-300 shadow w-fit">
      <div className="max-w-[83.12rem] w-fit mx-auto px-4">
        <div className="flex justify-evenly items-center h-16">
          <div className="flex items-center relative space-x-8">
            <Link
              draggable={false}
              to="/"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl text-nowrap flex-wrap ${
                location.pathname == "/" && "bg-indigo-100"
              }`}
            >
              Agregar producto
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/products"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/products" && "bg-indigo-100"
              }`}
            >
              Products
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/metrics"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/metrics" && "bg-indigo-100"
              }`}
            >
              Metrics
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/chats"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/chats" && "bg-indigo-100"
              }`}
            >
              Chats
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/users"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/users" && "bg-indigo-100"
              }`}
            >
              Users
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/payments"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/payments" && "bg-indigo-100"
              }`}
            >
              Payments
            </Link>
            <span>|</span>
            <Link
              draggable={false}
              to="/beneficiarys"
              className={`text-gray-700 hover:text-indigo-600 py-2 px-3 rounded-md text-xl ${
                location.pathname == "/beneficiarys" && "bg-indigo-100"
              }`}
            >
              Beneficiarys
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
