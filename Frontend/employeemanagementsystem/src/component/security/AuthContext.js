import { createContext, useContext, useState } from "react";
// import { apiClient } from "../api/ApiClient";
// import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


//2: Share the created context with other components
export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState(null) //NEW

    const [token, setToken] = useState(null)

    const authRequestData = {
        username: username,
       password:null
    }
    async function login(username, password) {

       // const baToken = 'Basic ' + window.btoa(username + ":" + password)
       try {

        authRequestData.password=password
        authRequestData.username=username
        const response = await executeJwtAuthenticationService(authRequestData)
        console.log(response.data)

        if(response.status==200){
            
            const jwtToken = 'Bearer ' + response.data
            console.log(jwtToken)
            setAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = jwtToken
                    return config
                }
            )

            return true            
        } else {
            logout()
            return false
        }    
    } catch(error) {
        logout()
        return false
    }
}

    function logout() {
        setToken(null)
        setUsername(null)
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username,token }}>
            {children}
        </AuthContext.Provider>
    )
}