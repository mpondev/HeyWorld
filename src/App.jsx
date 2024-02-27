import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './layout/AppLayout.jsx';
import { CitiesProvider } from './context/CitiesContext.jsx';

import Homepage from './pages/Homepage/Homepage.jsx';
import Login from './pages/Login/Login.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Product from './pages/Product/Product.jsx';

import City from './components/City/City.jsx';
import CityList from './components/CityList/CityList.jsx';
import CountryList from './components/CountryList/CountryList.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
