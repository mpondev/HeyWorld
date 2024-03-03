import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/FakeAuthContext.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
