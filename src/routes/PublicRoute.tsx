
import React from 'react';
import { useSelector} from 'react-redux'
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
    children: any;
  }

export const PublicRoute = ({children}:PrivateRouteProps) => {
    
    const {loggedIn} = useSelector((state: RootState) => state.dataSlice);

    return (!loggedIn ? <>{children}</> : <Navigate to="/inicio"/>)
}
