import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserType } from '../../redux';
import React, { useEffect } from 'react';

const ProtectedRoute = ({ children, route }) => {
    const userType = useSelector(selectUserType);
    const token = useSelector(selectToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/user/login');
        } else if (route && route?.roles && !route?.roles?.includes(userType)) {
            navigate('/dashboard');
        }
    }, [token, userType, route, navigate]);

    if (!token || (route && route?.roles && !route?.roles?.includes(userType))) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
