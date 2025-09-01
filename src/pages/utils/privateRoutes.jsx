import React from 'react'
import { useAuth} from '../../context/authContext';
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const {user, loading}=useAuth();

      if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );

  }

  return (
    <>
    {user ? children: <Navigate to='/login'/>}
    </>
  )
}

export default PrivateRoutes