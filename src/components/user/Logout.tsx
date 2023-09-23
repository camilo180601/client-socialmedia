import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Logout = () => {

    const {setAuth, setCounters} : any = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        setAuth({});
        setCounters({});
        navigate("/login");
    });

    return (
        <h1>Cerrando Sesión</h1>
    )
}

export default Logout