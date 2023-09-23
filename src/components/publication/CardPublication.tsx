import Global from '../helpers/Global'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import avatar from '../../assets/img/user.png'
import { Button, Card, CardHeader, CardBody, CardFooter, Avatar, Image } from "@nextui-org/react";
import { IconHeart, IconHeartFilled, IconMessageCircle, IconRepeat, IconTrashFilled } from "@tabler/icons-react";

const CardPublication = ({ publications, deletePublication, isImage, isVideo, like, unlike, likes, likesPublications }: any) => {

    const { auth }: any = useAuth();

    return (
        <>
            {
                publications.map((publication: any) => {
                    return (
                        publication ? (
                            <div className='mt-5 mb-5' key={publication._id}>
                                <Card className="w-50">
                                    <CardHeader className="justify-between">
                                        <div className="flex gap-5">
                                            <Link to={"/social/profile/" + publication.user._id} className="post__image-link">
                                                {publication.user.image !== "default.png" && <Avatar isBordered radius="full" size="md" src={Global.url + "user/avatar/" + publication.user.image} />}
                                                {publication.user.image === "default.png" && <Avatar isBordered radius="full" size="md" src={avatar} />}
                                            </Link>

                                            <div className="flex flex-col gap-1 items-start justify-center">
                                                <Link to={"/social/profile/" + publication.user._id} ><h4 className="text-small font-semibold leading-none text-default-600">{publication.user.name} {publication.user.surname}</h4></Link>
                                                <Link to={"/social/profile/" + publication.user._id} ><h5 className="text-small tracking-tight text-default-400">@{publication.user.nick}</h5></Link>
                                            </div>
                                        </div>
                                        {auth._id == publication.user._id &&
                                            <Button isIconOnly color="danger" variant="faded" onClick={() => deletePublication(publication._id)}>
                                                <IconTrashFilled />
                                            </Button>
                                        }
                                    </CardHeader>
                                    <CardBody className="px-3 py-0 text-small text-default-800">
                                        <p>
                                            {publication.text}
                                        </p>
                                        <span className="pt-2 center">
                                            {publication.file && isImage(publication.file) ? (
                                                <Image src={Global.url + "publication/media/" + publication.file} alt="Image" />
                                            ) : publication.file && isVideo(publication.file) ? (
                                                <div className='video-div'>
                                                <div className='video-publication'>
                                                    <video className='embed-responsive-item' controls>
                                                        <source src={Global.url + "publication/media/" + publication.file} type="video/mp4" />
                                                        Tu navegador no soporta el formato de video.
                                                    </video>
                                                </div>
                                                </div>
                                            ) : ("")}
                                        </span>
                                    </CardBody>
                                    <CardFooter className="gap-3">
                                        <div className="flex">
                                            <div className='ml-90 mr-90'>
                                                <IconMessageCircle />
                                            </div>
                                            <div className='ml-90 mr-90 flex'>
                                                {!likes.includes(publication._id) &&
                                                    <IconHeart className='hover' role='button' onClick={() => like(publication._id)} />
                                                }
                                                {likes.includes(publication._id) &&
                                                    <IconHeartFilled className='hover' role='button' onClick={() => unlike(publication._id)} />
                                                }
                                                &nbsp;
                                                {likesPublications.map((likePublication: any) => {
                                                    if (likePublication.id === publication._id) {
                                                        return (
                                                            <div key={likePublication.id}>
                                                                {likePublication.likes}
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                            <div className='ml-90 mr-90'>
                                                <IconRepeat/>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        ) : ""
                    )
                })
            }
        </>

    );
}

export default CardPublication
