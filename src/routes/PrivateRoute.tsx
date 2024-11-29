
import React from 'react';
import { useSelector} from 'react-redux'
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
    children: any;
  }

export const PrivateRoute = ({children}:PrivateRouteProps) => {
    
    const {loggedIn} = useSelector((state: RootState) => state.dataSlice);
    console.log('PrivateRoute loggedIn:', loggedIn);
    return (loggedIn ?<>{children}</>: <Navigate to="/login"/>)
}
