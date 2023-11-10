import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Users() {
  const [state, setState] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios.get("http://localhost:2000/getUserData")
      .then((response) => {
        console.log("get Data Successfully!", response.data);
        setState(response.data)
      })
      .catch((error) => {
        console.error("message Error :", error)
      })

  }, [])

  const addData = () => {
    navigate("/addUser")
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className='mt-5 mb-4'>
            <h1 className='text-center'>User Data</h1>
          </div>
          <div className='text-end mb-4'><button className='btn btn-primary' onClick={addData}>Add Data</button></div>
          <div class="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  Array.isArray(state) && state.map((item, index) => {
                    return <>
                      <tr key={index}>
                        <th>{index}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td className='text-center'><button className='btn btn-danger' >Delete</button> <button className='btn btn-success'>Update</button></td>
                      </tr>
                    </>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
