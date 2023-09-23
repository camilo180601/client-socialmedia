import { useState } from 'react'
import useForm from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import Global from '../helpers/Global';
import avatar from '../../assets/img/user.png'
import { Avatar } from "@nextui-org/react";
import { IconPhotoFilled } from "@tabler/icons-react";

const PostPublication = () => {

    const { auth }: any = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState("not-stored");

    const token: any = localStorage.getItem("token");

    const savePublication = async (e: any) => {
        e.preventDefault();

        let newPublication: any = form;
        newPublication.user = auth._id;

        const request = await fetch(Global.url + "publication/save", {
            method: "POST",
            body: JSON.stringify(newPublication),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success") {
            setStored("stored");
        } else {
            setStored("error");
        }

        const fileInput: any = document.querySelector("#file");

        if (data.status === "success" && fileInput.files[0]) {
            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            const uploadRequest = await fetch(Global.url + "publication/upload/" + data.publication._id, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();

            if (uploadData.status === "success") {
                setStored("stored");
            } else {
                setStored("error");
            }

        }

        const myForm: any = document.querySelector("#publication-form");
        myForm.reset();

    }
    return (
        <div className="aside__container-form">
            {
                stored === "stored" ?
                    <strong className='alert alert-success'>¡Publicada con exito!</strong>
                    : ''
            }
            {
                stored === "error" ?
                    <strong className='alert alert-danger'>¡Publicación erronea!</strong>
                    : ''
            }
            <form id='publication-form' className="flex flex-1 flex-col gap-y-10" onSubmit={savePublication}>

                <div>
                    <div className='flex'>
                        {auth.image != "default.png" && <Avatar isBordered radius="full" size="md" src={Global.url + "user/avatar/" + auth.image} />}
                        {auth.image == "default.png" && <Avatar isBordered radius="full" size="md" src={avatar} />}
                        <textarea
                            name="text"
                            className="w-full text-2x1 m-3 bg-white placeholder-gray-500"
                            rows={4}
                            onChange={changed}
                            placeholder='¡¿Qué está pasando?!'
                        />
                    </div>

                    <div className="flex">
                        <label htmlFor="file" className="label-post-file ml-12"><IconPhotoFilled className='cursor hover' /></label>
                        <input type="file" name="file" id='file' className="none" />
                        <div className='flex'>
                            <button type="submit"
                                className="bg-blue-500 hover:bg-green-500 ml-100 text-white font-bold rounded-full px-4 py-1" >
                                Postear
                            </button>
                        </div>
                    </div>
                </div>

            </form>

        </div >
    )
}

export default PostPublication