import FormData from "form-data";
const API_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3030/`

export const fetchDataFromApi = async(endpoint, _options = false) => {
    
    const form = new FormData();
    if(_options){
        form.append('email', _options?.email)
    }

    const options = !_options ? {
        method: 'GET',
        //headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
    } : {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
        body: JSON.stringify(_options)
    }

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data
}

export const updateDataFromApi = async(endpoint, _options) => {
    const form = new FormData();
    if(_options){
        _options.map((opt) => form.append(opt?.key, opt?.value))
    }
    const options = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`
        },
        body: form
    }
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    return data
}