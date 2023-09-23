import Global from "./Global";

const GetProfile = async(userId: any, token: any, setUserProfile: any) => {
    const request = await fetch(Global.url + "user/profile/" + userId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await request.json();

    if(data.status === "success"){
        setUserProfile(data.user);
    }

    return data;
}

export default GetProfile