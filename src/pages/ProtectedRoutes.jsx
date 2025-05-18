import { useEffect } from "react";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {

    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(function () {
        if (!isAuthenticated) navigate('/')
        
    }, [isAuthenticated, navigate])
    return isAuthenticated? children : null;
}
