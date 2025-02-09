import React from 'react'

export default function ListAllUsers() {

    const users = [
                    {id: 1, email: 'kunalsupekar@gmail.com',firstname :'ram' ,lastname:'mishra',status:'pending'},
                    {id: 2, email: 'kunalsupekar@gmail.com', firstname :'shyam',lastname:'mishra',status:'pending'},
                    {id: 3, email: 'kunalsupekar@gmail.com',firstname :'ram',lastname:'mishra',status:'deactivate'},
                ]

  return (
    <div className="container">
            <h1>All Employeess!</h1>
            {/* {message && <div className="alert alert-warning">{message}</div>} */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>user_id</th>
                            <th>email</th>
                            <th>FirstName</th>
                            <th>Lastname</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.email}</td>
                                        <td>{todo.firstname}</td>
                                        <td>{todo.lastname}</td>
                                        <td>{todo.status}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>

                </table>
                {/* <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div> */}
            </div>
        </div>
    ) 
  
}
