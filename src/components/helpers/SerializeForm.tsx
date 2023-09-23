const SerializeForm = (form: any) => {

    const formData = new FormData(form);

    const completeObj : any = {};

    for(let [name, value] of formData){
        completeObj[name] = value;
    }

    return completeObj;
}

export default SerializeForm