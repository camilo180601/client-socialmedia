import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import PublicLayout from '../components/layout/public/PublicLayout'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import PrivateLayout from '../components/layout/private/PrivateLayout'
import Feed from '../components/publication/Feed'
import AuthProvider from '../components/context/AuthProvider'
import Logout from '../components/user/Logout'
import People from '../components/user/People'
import Config from '../components/user/Config'
import Following from '../components/follow/Following'
import Followers from '../components/follow/Followers'
import Profile from '../components/user/Profile'
import Likes from '../components/like/Likes'

const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                    <Route path='/social' element={<PrivateLayout />} >
                        <Route index element={<Feed />} />
                        <Route path='feed' element={<Feed />} />
                        <Route path='logout' element={<Logout />} />
                        <Route path='people' element={<People />} />
                        <Route path='config' element={<Config />} />
                        <Route path='following/:userId' element={<Following />} />
                        <Route path='followers/:userId' element={<Followers />} />
                        <Route path='likes/:userId' element={<Likes />} />
                        <Route path='profile/:userId' element={<Profile />} />
                    </Route>
                    <Route path='*' element={
                        <>
                            <p>
                                <h1>Error pagina no encontrada</h1>
                                <Link to="/">Volver al Inicio</Link>
                            </p>
                        </>
                    } />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routing