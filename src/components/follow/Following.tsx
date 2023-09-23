import { useEffect, useState } from 'react'
import Global from '../helpers/Global';
import UserList from '../user/UserList';
import GetProfile from '../helpers/GetProfile';
import { useParams } from 'react-router-dom';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';

const Following = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile]: any = useState({});

    const params = useParams();

    const token: any = localStorage.getItem("token");

    const getUsers = async (nextPage = 1) => {

        setLoading(true);

        const userId = params.userId;

        const request = await fetch(Global.url + "follow/following/" + userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "appication/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        let cleanUsers: Array<any> = [];

        data.following.forEach((follow: any) => {
            cleanUsers = [...cleanUsers, follow.followed]
        })

        data.users = cleanUsers;

        if (data.status === "success" && data.users) {

            let newUsers = data.users;

            if (users.length >= 1) {
                newUsers = [...users, ...data.users]
            }

            setUsers(newUsers);
            setFollowing(data.user_following);
            setLoading(false);

            if (users.length >= (data.total - data.users.length)) {
                setMore(false);
            }
        }

    }

    useEffect(() => {
        getUsers(1);
        GetProfile(params.userId, token, setUserProfile);
    }, []);

    return (
        <div className='w-full mx-auto items-center'>
            <header className="content__header m-5 flex-col">
                <div className='flex'>
                    <Link to={"/social/profile/" + userProfile._id}>
                        <IconArrowNarrowLeft className='mt-1 mr-2' />
                    </Link>
                    <h2 className='text-xl font-bold'>{userProfile.name} {userProfile.surname}</h2>
                </div>
                <h5 className='text-small tracking-tight text-default-400 flex ml-8'>@{userProfile.nick}</h5>
            </header>
            <div className='w-full mx-auto items-center'>
                <NavLink className={({isActive}) => isActive ? 'm-10' : 'inactive m-10'} to={"/social/followers/" + userProfile._id} >Seguidores</NavLink>
                <NavLink className={({isActive}) => isActive ? 'm-10' : 'inactive m-10'} to={"/social/following/" + userProfile._id} >Seguidos</NavLink>
            </div>
            <UserList users={users}
                getUsers={getUsers}
                following={following}
                setFollowing={setFollowing}
                more={more}
                loading={loading}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default Following