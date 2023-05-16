import Axios from "axios";

let URL_API = 'http://localhost/copyonline_api'
//let URL_API = 'https://api.copyonline.com.br'

const Api = Axios.create({
    baseURL: URL_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default Api;