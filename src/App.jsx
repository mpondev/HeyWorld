import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppLayout = lazy(() => import('./layout/AppLayout.jsx'));
import { CitiesProvider } from './context/CitiesContext.jsx';
import { AuthProvider } from './context/FakeAuthContext.jsx';

const Homepage = lazy(() => import('./pages/Homepage/Homepage.jsx'));
const Login = lazy(() => import('./pages/Login/Login.jsx'));
const PageNotFound = lazy(() =>
  import('./pages/PageNotFound/PageNotFound.jsx')
);
const Pricing = lazy(() => import('./pages/Pricing/Pricing.jsx'));
const Product = lazy(() => import('./pages/Product/Product.jsx'));
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute.jsx';

import City from './components/City/City.jsx';
import CityList from './components/CityList/CityList.jsx';
import CountryList from './components/CountryList/CountryList.jsx';
import Form from './components/Form/Form.jsx';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage.jsx';

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
