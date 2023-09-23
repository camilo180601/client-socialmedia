import { useEffect, useState } from 'react'
import Global from '../helpers/Global'
import CardPublication from './CardPublication'


const PublicationList = ({ publications, getPublications, likes, setLikes, page, setPage, more, setMore } : any) => {

    const [likesPublications, setLikePublications] : any = useState([]);

    const token : any = localStorage.getItem("token");

    const isImage = (fileName : any) => {
        const imageExtensions = ["jpg", "jpeg", "png", "gif"];
        const extension = fileName.split(".").pop().toLowerCase();
        return imageExtensions.includes(extension);
    }

    const isVideo = (fileName : any) => {
        const videoExtensions = ["mp4", "webm", "mov"];
        const extension = fileName.split(".").pop().toLowerCase();
        return videoExtensions.includes(extension);
    }

    const deletePublication = async (publicationId : any) => {
        const request = await fetch(Global.url + "publication/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setPage(1);
            setMore(true);
            getPublications(1, true);
        }
    }

    const counter = async () => {
        const updatedLikesPublications : Array<any> = [];

        for (const publication of publications) {

            if (publication) {
                const request = await fetch(Global.url + "like/counter/" + publication._id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });

                const data = await request.json();

                let updatedPublication = { id: publication._id, likes: data.total };
                updatedLikesPublications.push(updatedPublication);
            }
        }

        setLikePublications(updatedLikesPublications);
    }

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    const like = async (publicationId : any) => {

        const request = await fetch(Global.url + "like/save", {
            method: "POST",
            body: JSON.stringify({ publication: publicationId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {

            setLikes([...likes, publicationId])
        }
    }

    const unlike = async (publicationId : any) => {
        const request = await fetch(Global.url + "like/remove/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "appication/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            let filterLikes = likes.filter((LikePublicationId : any) => publicationId !== LikePublicationId)
            setLikes(filterLikes);
        }
    }

    useEffect(() => {
        counter();
    }, [getPublications])

    return (
        <>
            <CardPublication publications={publications}
                deletePublication={deletePublication}
                isImage={isImage}
                isVideo={isVideo}
                likes={likes}
                likesPublications={likesPublications}
                like={like}
                unlike={unlike}
            />

            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
            <br />
        </>
    )
}

export default PublicationList