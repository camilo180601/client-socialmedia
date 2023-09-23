import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PrivateLayout = () => {

    const { auth, loading } : any = useAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    } else {

        return (
            <>
                <Header />
                <section className='layout__content'>
                    {auth._id ?
                        <Outlet />
                        :
                        <Navigate to="/login" />
                    }
                </section>
            </>
        )
    }
}

export default PrivateLayout