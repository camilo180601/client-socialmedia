import { useEffect, useState } from 'react'
import Global from '../helpers/Global';
import UserList from './UserList';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const People = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    const token : any = localStorage.getItem("token");

    const getUsers = async (nextPage = 1) => {

        setLoading(true);

        const request = await fetch(Global.url + "user/list/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "appication/json",
                "Authorization": token
            }
        });

        const data = await request.json();

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
    }, []);

    return (
        <div className='mx-auto'>
            <header className="content__header m-5 flex">
                <Link to="/social">
                    <IconArrowNarrowLeft className='mt-1 mr-2'/>
                </Link>
                <h2 className='text-xl font-bold'>Conectar</h2>
            </header>
            <div className='mb-5 mt-5 w-50'>
                <p className="text-xl font-bold">Gente que quizas conozcas</p>
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

export default People