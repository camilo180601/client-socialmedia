import { useEffect, useState } from 'react'
import Global from '../helpers/Global'
import PublicationList from './PublicationList'
import PostPublication from './PostPublication';
import { Button } from '@nextui-org/react';

const Feed = () => {

    const [publications, setPublications] = useState([]);
    const [likes, setLikes] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    const token : any = localStorage.getItem("token");

    const getPublications = async (nextPage = 1, showNews = false) => {
        
        if(showNews){
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }

        const request = await fetch(Global.url + "publication/feed/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {

            let newPublications = data.publications;

            if (!showNews && publications.length >= 1) {
                newPublications = [...publications, ...data.publications];
            }

            setPublications(newPublications);
            setLikes(data.likes);

            if (!showNews && publications.length >= (data.total - data.publications.length)) {
                setMore(false);
            }

            if (data.pages <= 1) {
                setMore(false);
            }
        }
    }

    useEffect(() => {
        getPublications(1, false);
    }, []);

    return (
        <div className='w-full mx-auto items-center' >
            <header className="content__header mt-10 mb-10 flex">
                <h2 className='text-xl font-bold'>Inicio</h2>
            </header>
            <PostPublication />
            <Button color='primary' className='bg-blue-500 hover:bg-green-500 text-white font-bold' variant='bordered' onClick={() => getPublications(1, true)} >Mostrar Nuevas</Button>
            <br/>
            <PublicationList publications={publications}
                getPublications={getPublications}
                likes={likes}
                setLikes={setLikes}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
        </div>
    )
}

export default Feed