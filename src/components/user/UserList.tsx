import { Button, Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import avatar from '../../assets/img/user.png';
import { useState } from 'react'
import Global from '../helpers/Global';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, loading }: any) => {

    const { auth }: any = useAuth();

    const [hovered, setHovered] = useState(null)

    const token: any = localStorage.getItem("token");

    const handleMouseOver = (userId: any) => {
        setHovered(userId);
    };

    const handleMouseOut = () => {
        setHovered(null);
    };

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
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

            setFollowing([...following, userId])
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
            let filterFollowings = following.filter((followingUserId: any) => userId !== followingUserId)
            setFollowing(filterFollowings);
        }
    }

    return (
        <>
            <div className="content__posts">

                {users.map((user: any) => {
                    return (
                        <article className="posts__post m-2" key={user._id}>
                            <Card className="w-50">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Link to={"/social/profile/" + user._id} className="post__image-link">
                                            {user.image !== "default.png" && <Avatar isBordered radius="full" size="md" src={Global.url + "user/avatar/" + user.image} />}
                                            {user.image === "default.png" && <Avatar isBordered radius="full" size="md" src={avatar} />}
                                        </Link>

                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <Link to={"/social/profile/" + user._id} ><h4 className="text-small font-semibold leading-none text-default-600">{user.name} {user.surname}</h4></Link>
                                            <Link to={"/social/profile/" + user._id} ><h5 className="text-small tracking-tight text-default-400">@{user.nick}</h5></Link>
                                        </div>
                                    </div>
                                    {user._id != auth._id &&
                                        <div className="post__buttons">
                                            {!following.includes(user._id) &&
                                                <Button 
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold"
                                                    radius="full" onClick={() => follow(user._id)}>
                                                    Seguir
                                                </Button>
                                            }
                                            {following.includes(user._id) &&
                                                <Button radius="full"
                                                    key={user._id}
                                                    className="bg-blue-500 hover:bg-red-700 text-white font-bold"
                                                    onMouseOver={() => handleMouseOver(user._id)}
                                                    onMouseOut={handleMouseOut}
                                                    onClick={() => unfollow(user._id)}
                                                >
                                                    {hovered === user._id ? 'Dejar de seguir' : 'Siguiendo'}
                                                </Button>
                                            }
                                        </div>
                                    }

                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small m-1 mb-3">
                                    <p>
                                        {user.bio}
                                    </p>
                                </CardBody>
                            </Card>
                        </article>
                    );
                })}
            </div>
            {loading ? <div>Cargando...</div> : ""}
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>
            }
            <br />
        </>
    )
}

export default UserList