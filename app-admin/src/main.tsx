import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './component/Admin/Home/Index'
import Product from './component/Admin/Product/Index'
import Category from './component/Admin/Category/Index'
import CreateProduct from './component/Admin/Product/CreateProduct'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './component/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/product",
        element: <Product/>
      },
      {
        path: "/category",
        element: <Category/>
      },
      {
        path: "/product/create",
        element: <CreateProduct/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
