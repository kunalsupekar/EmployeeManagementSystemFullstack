import axios from "axios";



export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
);


// const jwtToken=sessionStorage.getItem("token")
// console.log(jwtToken)
// apiClient.defaults.headers.common["Authorization"] = jwtToken;

apiClient.defaults.withCredentials = true;
