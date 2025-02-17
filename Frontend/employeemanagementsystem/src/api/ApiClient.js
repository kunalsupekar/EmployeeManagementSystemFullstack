import axios from "axios";

import Cookies from "js-cookie";


export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
        
    }
);


// const jwtToken=sessionStorage.getItem("token")
// console.log(jwtToken)
// apiClient.defaults.headers.common["Authorization"] = jwtToken;

//apiClient.defaults.withCredentials = true;

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});