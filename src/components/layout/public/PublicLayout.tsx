import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PublicLayout = () => {

    const { auth }: any = useAuth();

    return (
        <>
            <Header />
            {!auth || !auth._id ?
                <Outlet />
                :
                <Navigate to="/social" />
            }
        </>
    )
}

export default PublicLayout