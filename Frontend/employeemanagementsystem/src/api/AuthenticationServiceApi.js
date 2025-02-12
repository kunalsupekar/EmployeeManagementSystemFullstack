import { apiClient } from "./ApiClient";


export const executeBasicAuthenticationService
= (token) => apiClient.get(`/todos/basicauth`,{
    headers: {
        Authorization: token
    }
})

export const executeJwtAuthenticationService
    = (authRequestData) => 
        apiClient.post(`/authenticate`,authRequestData)