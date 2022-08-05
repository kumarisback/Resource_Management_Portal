
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import ContextApi from  '../component/context/ContextApi'
const ProtectedRoute = ({ children }) => {
    let auth = useContext(ContextApi);
    if (!auth.isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute