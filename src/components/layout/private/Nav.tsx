import avatar from '../../../assets/img/user.png'
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import Global from '../../helpers/Global';
import { IconHome, IconMessages, IconBaselineDensityMedium, IconSettings, IconLogout } from "@tabler/icons-react";
const Nav = () => {

    const { auth }: any = useAuth();

    return (
        <div
            id="sidebar"
            className="bg-white h-screen md:block shadow-xl px-3 w-70 md:w-60 lg:w-80 overflow-x-hidden transition-transform duration-300 ease-in-out"
            x-show="sidenav"

        >
            <div className="space-y-6 md:space-y-10 mt-10">
                <h1 className="font-bold text-4xl text-center md:hidden">
                    <span className="text-teal-600">.</span>
                </h1>
                <div id="profile" className="space-y-5">
                    <NavLink to={"/social/profile/" + auth._id} className="list-end__link-image">
                        {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="w-10 md:w-16 rounded-full mx-auto" alt="Imagen de perfil" />}
                        {auth.image == "default.png" && <img src={avatar} className="w-10 md:w-16 rounded-full mx-auto" alt="Imagen de perfil" />}
                    </NavLink>
                    <div>
                        <h2
                            className="font-medium text-xs md:text-sm text-center text-black-500 font-bold"
                        >
                            <NavLink to={"/social/profile/" + auth._id}>
                                <span>{auth.name} {auth.surname}</span>
                            </NavLink>
                        </h2>
                        <p className="text-xs text-gray-500 text-center">
                            <NavLink to={"/social/profile/" + auth._id}>
                                <span>@{auth.nick}</span>
                            </NavLink>
                        </p>
                    </div>
                </div>
                <div id="menu" className="flex flex-col space-y-5 center">
                    <NavLink
                        to="/social"
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <IconHome />
                            &nbsp;
                            <span className="">Inicio</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to=""
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <IconMessages />
                            &nbsp;
                            <span className="">Mensajes</span>
                        </div>
                    </NavLink>
                    <NavLink to="/social/feed"
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <IconBaselineDensityMedium />
                            &nbsp;
                            <span className="">Timeline</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/social/people"
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                ></path>
                            </svg>
                            &nbsp;
                            <span className="">Gente</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/social/config"
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <IconSettings />
                            &nbsp;
                            <span className="">Ajustes</span>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/social/logout"
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-blue-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                        <div className='flex justify-content-center align-items-center'>
                            <IconLogout />
                            &nbsp;
                            <span className="">Cerrar sesión</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div >
    )
}

export default Nav