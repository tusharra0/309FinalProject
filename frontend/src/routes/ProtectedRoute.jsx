import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { token, role } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        // Optional: Redirect to unauthorized page or dashboard
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
