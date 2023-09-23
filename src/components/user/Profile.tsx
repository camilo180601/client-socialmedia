import { useEffect, useState } from 'react'
import { Button } from "@nextui-org/react";
import avatar from "../../assets/img/user.png"
import Global from '../helpers/Global'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import GetProfile from '../helpers/GetProfile'
import {IconArrowNarrowLeft} from '@tabler/icons-react'
import PublicationList from '../publication/PublicationList'

const Profile = () => {

    const { auth }: any = useAuth();
    const [user, setUser]: any = useState({});
    const [counters, setCounters]: any = useState({});
    const [iFollow, setIFollow] = useState(false);
    const [publications, setPublications] = useState([]);
    const [likes, setLikes] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const params = useParams();

    const [hovered, setHovered] = useState(null)

    const token: any = localStorage.getItem("token");

    const handleMouseOver = (userId: any) => {
        setHovered(userId);
    };

    const handleMouseOut = () => {
        setHovered(null);
    };

    const getCounters = async () => {

        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setCounters(data);
        }
    }

    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, token, setUser);

        if (dataUser.following && dataUser.following._id) {
            setIFollow(true);
        }
    }

    const follow = async (userId: any) => {

        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {

            setIFollow(true);
        }
    }

    const unfollow = async (userId: any) => {
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "appication/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setIFollow(false);
        }
    }

    const getPublications = async (nextPage = 1, newProfile = false) => {
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {

            let newPublications = data.publications;

            if (!newProfile && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            if (newProfile) {
                newPublications = data.publications;
                setMore(true);
                setPage(1);
            }

            setPublications(newPublications);
            setLikes(data.likes);

            if (!newProfile && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
        }
    }

    useEffect(() => {
        getDataUser();
        getCounters();
        getPublications(1, true);
    }, []);

    useEffect(() => {
        getDataUser();
        getCounters();
        setMore(true);
        getPublications(1, true);
    }, [params]);

    return (
        <div className='w-full items-center'>
            <div className='flex m-5'>
                <Link to="/social">
                    <IconArrowNarrowLeft className='mt-1 mr-2' />
                </Link>
                <div className='flex-col text-left'>
                    <h2 className='text-xl font-bold'>{user.name} {user.surname}</h2>
                    <h5 className='text-small text-default-400'>{counters.publications} Publicaciones</h5>
                </div>
            </div>
            <header className="w-full items-center ml-30">
                <div className="w-full max-w bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end px-4 pt-4">
                        {auth._id != user._id &&
                            (iFollow ?
                                <Button radius="full"
                                    key={user._id}
                                    className="bg-blue-500 hover:bg-red-700 mt-10 ml-50 text-white font-bold "
                                    onMouseOver={() => handleMouseOver(user._id)}
                                    onMouseOut={handleMouseOut}
                                    onClick={() => unfollow(user._id)}
                                >
                                    {hovered === user._id ? 'Dejar de seguir' : 'Siguiendo'}
                                </Button>
                                :
                                <Button
                                    className="bg-blue-500 hover:bg-blue-700 mt-10 ml-50 text-white font-bold"
                                    radius="full" onClick={() => follow(user._id)}>
                                    Seguir
                                </Button>
                            )
                        }
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        {auth.image != "default.png" &&
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={Global.url + "user/avatar/" + auth.image} alt="Profile image" />
                        }
                        {auth.image == "default.png" &&
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={avatar} alt="Profile image" />
                        }
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name} {user.surname}</h5>
                        <h5 className="text-small tracking-tight text-default-400">@{user.nick}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.bio}</span>
                        <div className="flex mt-4 space-x-3 md:mt-6">

                        </div>
                        <div className='flex flex-row'>
                            <div className="m-5">
                                <Link to={"/social/following/" + user._id} className="following__link">
                                    <span className="font-bold">{counters.following}</span>
                                    <span className="ml-2">Siguiendo</span>
                                </Link>
                            </div>
                            <div className="m-5">
                                <Link to={"/social/followers/" + user._id} className="following__link">
                                    <span className="font-bold">{counters.followed}</span>
                                    <span className="ml-2">Seguidores</span>
                                </Link>
                            </div>
                            <div className="m-5">
                                <Link to={"/social/profile/" + user._id} className="following__link">
                                    <span className="font-bold">{counters.publications}</span>
                                    <span className="ml-2">Publicaciones</span>
                                </Link>
                            </div>
                            <div className="m-5">
                                <Link to={"/social/likes/" + user._id} className="following__link">
                                    <span className="following__title">Me gusta</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
            <section className='max-w-[600px] mx-auto'>
                <PublicationList publications={publications}
                    getPublications={getPublications}
                    likes={likes}
                    setLikes={setLikes}
                    page={page}
                    setPage={setPage}
                    more={more}
                    setMore={setMore}
                />
            </section>
            <br />
        </div>
    )
}

export default Profile