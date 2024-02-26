import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './App.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Product from './pages/Product/Product.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homepage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
