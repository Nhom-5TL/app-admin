import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './component/Admin/Home/Index'
import Product from './component/Admin/Product/Index'
import CreateProduct from './component/Admin/Product/CreateProduct'
import EditProduct from './component/Admin/Product/EditProduct'
import Category from './component/Admin/Category/Index'
import Create from './component/Admin/Category/Create'
import UpdateCategory from './component/Admin/Category/UpdateCategory'


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
        path: "/product/create",
        element: <CreateProduct/>
      },
      {
        path: ":maSP",
        element: <EditProduct/>
      },
      {
        path: "/category",
        element: <Category/>
      },
      {
        path: "/category/create",
        element: <Create/>
        
      },
      {
        path: "/category/update",
        element: <UpdateCategory/>
        
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
