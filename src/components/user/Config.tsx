import { useState } from 'react'
import useAuth from '../hooks/useAuth';
import Global from '../helpers/Global';
import avatar from '../../assets/img/user.png'
import { IconPhotoFilled, IconArrowNarrowLeft } from "@tabler/icons-react";
import SerializeForm from '../helpers/SerializeForm';
import { Button, Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { Link } from 'react-router-dom';

const Config = () => {

    const { auth, setAuth }: any = useAuth();

    const [saved, setSaved] = useState("not-saved");

    const updateUser = async (e: any) => {
        e.preventDefault();

        let newDataUser = SerializeForm(e.target);

        const token: any = localStorage.getItem("token");

        delete newDataUser.image;

        const request = await fetch(Global.url + "user/update", {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if (data.status === "success" && data.user) {
            delete data.user.password;

            setAuth(data.user);
            setSaved("saved");
        } else {
            setSaved("error");
        }

        const fileInput: any = document.querySelector("#image");

        if (data.status === "success" && fileInput.files[0]) {

            const formData = new FormData();

            formData.append('image', fileInput.files[0])

            const uploadRequest = await fetch(Global.url + "user/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            });

            const uploadData = await uploadRequest.json();

            if (uploadData.status === "success" && uploadData.user) {
                delete uploadData.user.password;
                setAuth(uploadData.user);
                setSaved("saved");
            } else {
                setSaved("error");
            }
        }
    }

    return (
        <div className='w-full items-center'>
            <div className='w-full items-center w-50'>
                <Card className="py-6">
                    <header className="content__header ml-14 flex-col">
                        <div className='flex'>
                            <Link to="/social">
                                <IconArrowNarrowLeft className='mt-1 mr-2' />
                            </Link>
                            <h2 className='text-xl font-bold'>Ajustes de Perfil</h2>
                        </div>
                        {saved === "saved" ?
                            <strong className='alert alert-success mt-5'>¡Usuario actualizado con exito!</strong>
                            : ''
                        }
                        {saved === "error" ?
                            <strong className='alert alert-danger mt-5'>¡Usuario NO se ha actualizado!</strong>
                            : ''
                        }
                    </header>
                    <CardBody className="overflow-visible py-2">
                        <form className='form-register flex-col' onSubmit={updateUser}>
                            <div className='form-register flex'>
                                {auth.image != "default.png" &&
                                    <img src={Global.url + "user/avatar/" + auth.image} className="w-10 md:w-16 rounded-full " alt="Imagen de perfil" />
                                }
                                {auth.image == "default.png" &&
                                    <img src={avatar} className="w-10 md:w-16 rounded-full" alt="Imagen de perfil" />
                                }
                                <label htmlFor="image" className="label-post-file ml-12"><IconPhotoFilled className='cursor hover mt-10' /></label>
                                <input className='none' type='file' name='image' id='image' />
                            </div>
                            <div className='form-register'>
                                <Input type='text' name='name' label="Nombre" placeholder="Ingrese su nombre" defaultValue={auth.name} />
                            </div>
                            <div className='form-register'>
                                <Input type='text' name='surname' label="Apellidos" placeholder='Ingrese sus apellidos' defaultValue={auth.surname} />
                            </div>
                            <div className='form-register'>
                                <Input type='text' name='nick' label="Nombre de usuario" placeholder='Ingrese su nombre de usuario' defaultValue={auth.nick} />
                            </div>
                            <div className='form-register'>
                                <Input type='email' name='email' label="Correo" placeholder='Ingrese su correo' defaultValue={auth.email} />
                            </div>
                            <div className='form-register'>
                                <Textarea
                                    label="Biografía"
                                    placeholder="Ingrese su biografía"
                                    className="max-w"
                                    defaultValue={auth.bio}
                                />
                            </div>
                            <div className='form-register'>
                                <Input type='password' name='password' label="Contraseña" placeholder='Ingrese su contraseña' />
                            </div>
                            <div className='text-center w-full mx-auto items-center mt-10'>
                                <Button radius='lg' className='mr-8' type='submit' color='primary'>
                                    Actualizar
                                </Button>
                                <Button radius='lg' className='ml-8'>
                                    <Link to="/social">Cancelar</Link>
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Config