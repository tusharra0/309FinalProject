import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRedirect = () => {
    const { role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (role) {
            const normalizedRole = (role || '').toLowerCase();
            switch (normalizedRole) {
                case 'regular':
                case 'user':
                    navigate('/user/dashboard', { replace: true });
                    break;
                case 'cashier':
                    navigate('/cashier/dashboard', { replace: true });
                    break;
                case 'manager':
                    navigate('/manager/dashboard', { replace: true });
                    break;
                case 'organizer':
                    navigate('/organizer/dashboard', { replace: true });
                    break;
                case 'superuser':
                    navigate('/superuser/dashboard', { replace: true });
                    break;
                default:
                    navigate('/', { replace: true });
            }
        } else {
            navigate('/login', { replace: true });
        }
    }, [role, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
    );
};

export default RoleRedirect;
