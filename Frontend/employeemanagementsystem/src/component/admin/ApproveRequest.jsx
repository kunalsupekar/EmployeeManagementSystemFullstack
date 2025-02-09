import React from 'react'

export default function ApproveRequest() {
  const today = new Date()

    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay())
  const users = [
                    {id: 1, email: 'kunalsupekar@gmail.com',firstname :'ram' ,status:'pending'},
                    {id: 2, email: 'kunalsupekar@gmail.com', firstname :'shyam',status:'pending'},
                    {id: 3, email: 'kunalsupekar@gmail.com',firstname :'ram',status:'pending'},
                ]

  return (
    <div className="container">
            <h1>Pending Requests !</h1>
            {/* {message && <div className="alert alert-warning">{message}</div>} */}
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>email</th>
                            <th>FirstName</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Reject</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.email}</td>
                                        <td>{todo.firstname}</td>
                                        <td>{todo.status}</td>
                                        <td> <button className="btn btn-warning"
                                            >Approve</button> </td>
                                        <td> <button className="btn btn-success"
                                            >Reject</button> </td>
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
