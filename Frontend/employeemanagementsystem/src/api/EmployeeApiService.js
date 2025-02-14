import { apiClient } from "./ApiClient"


export const addUserApi
  = (user) => apiClient.post(`/api/users/register`, user)

  export const userLoginApi
  = (userEmail,password) => apiClient.post(`/api/login`, {userEmail,password})

  export const getUserByEmail = (userEmail) => 
    apiClient.get(`/api/users/email/${userEmail}`)
  


  export const updateUserProfile = (userId, updatedData) => {
    return apiClient.put(`api/users/${userId}`, updatedData);
};


//Admin Api Service

export const getAllUserByRole=(role)=> apiClient.get(`api/admin/users/${role}`)

export const getAllUserByStatus=(status)=> apiClient.get(`api/admin/users/status/${status}`)

export const registerUserViaEmailApi=(userDto)=> apiClient.post(`api/admin/users/register`,userDto)

export const getUserById=(userId)=> apiClient.get(`api/users/${userId}`)

export const changeUserStatusById=(userId,newStatus)=> apiClient.post(`api/admin/users/changeStatus/${userId}`,newStatus,{
  
    headers: { 'Content-Type': 'text/plain' },
  });



  export const importUserFromFile=(formData)=>
    apiClient.post(`/api/admin/users/import`,formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })



export const updateUserById=(userId,updatedData)=> apiClient.put(`api/admin/users/${userId}`,updatedData)


export const deleteUserById=(userId)=> apiClient.delete(`api/admin/users/${userId}`)

//export const getAllUsersByTheirRole=()=>
export const uploadFileForUser=(userId,formData)=>
  apiClient.post(`/api/admin/users/uploadFile/${userId}`,formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})


export const getLoginHistoryForUsers=()=> apiClient.get(`api/admin/users/loginHistory`)


export const getMessagesByreceiverId=(userId)=> apiClient.get(`api/messages/receiver/${userId}`)

export const sendMessageApi=(messageDto)=> apiClient.post(`api/messages/send`,messageDto)



export const checkApiService=()=>
  apiClient.get(`/api/users/email`,{
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaGFrdUBnbWFpbC5jb20iLCJpYXQiOjE3MzkzNDk3NDYsImV4cCI6MTczOTM2Nzc0Nn0.lM_5q3edHrR7fo1pZD-Dz5o50pFEucbbdgWi_ZkB2zw'
    },
    withCredentials: true 
  })


