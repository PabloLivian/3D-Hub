import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
