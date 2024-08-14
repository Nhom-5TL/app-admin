import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Product from "./component/Admin/Product/Index";
import CreateProduct from "./component/Admin/Product/CreateProduct";
import EditProduct from "./component/Admin/Product/EditProduct";
import Category from "./component/Admin/Category/Index";
import Create from "./component/Admin/Category/Create";
import UpdateCategory from "./component/Admin/Category/UpdateCategory";
import ThuongHieu from "./component/Admin/ThuongHieu/Index";
import CreateThuongHieu from "./component/Admin/ThuongHieu/Create";
import UpdateThuongHieu from "./component/Admin/ThuongHieu/UpdateThuongHieu";
import DonHang from "./component/Admin/Order/Index";
import Layout from "./component/Layout";
import TK from './component/Admin/TaiKhoan/Load'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Product /> },
      { path: "/product", element: <Product /> },
      { path: "/product/create", element: <CreateProduct /> },
      { path: ":maSP", element: <EditProduct /> },
      { path: "/category", element: <Category /> }, 
      { path: "/category/create", element: <Create /> },
      { path: "/category/update/:MaLoai", element: <UpdateCategory /> },
      { path: "/ThuongHieu", element: <ThuongHieu /> },
      { path: "/ThuongHieu/create", element: <CreateThuongHieu /> },
      {
        path: "/ThuongHieu/update/:MaThuongHieu",
        element: <UpdateThuongHieu />,
      },
      { path: "/load", element: <TK /> },
      { path: "/order", element: <DonHang /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
