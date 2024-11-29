import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { setLogin } from '../store/dataSlice/dataSlice';
import { useDispatch } from 'react-redux';

export const MainNavigator = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const setLoginDispatch = (login: boolean) => {
        dispatch(setLogin(login));
    };

    useEffect(() => {
        setTimeout(() => {
            setLoginDispatch(true);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading1...</div>; // Asegúrate de que el texto sea consistente
    }

    return (
        <div>
            <Routes>
                <Route path="/login/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<div>Login Page</div>} />
                        </Routes>
                    </PublicRoute>
                } />
                <Route path='/*' element={
                    <PrivateRoute>
                        <Routes>
                            <Route path="/*" element={<div>Dashboard</div>} />
                        </Routes>
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    );
};
