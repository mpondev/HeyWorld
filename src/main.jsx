import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './App.jsx';
import AppLayout from './layout/AppLayout.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import Login from './pages/Login/Login.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Product from './pages/Product/Product.jsx';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Homepage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<p>LIST</p>} />
        <Route path="cities" element={<p>List of cities</p>} />
        <Route path="countries" element={<p>Countries</p>} />
        <Route path="form" element={<p>Form</p>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
