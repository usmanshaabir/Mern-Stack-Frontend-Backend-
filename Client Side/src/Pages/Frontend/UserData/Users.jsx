import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { deleteUserData } from "../ApiService";
// import { updatedUsers } from "../ApiService";

const initState = { name: '', email: '', password: '' };


export default function Users() {
  const [state, setState] = useState([]);

  const [selectedUser, setSelectedUser] = useState(initState);
  // const [updateChanges, setUpdateChanges] = useState(initState);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2000/getUserData")
      .then((response) => {
        console.log("get Data Successfully!", response.data);
        setState(response.data);
      })
      .catch((error) => {
        console.error("message Error :", error);
      });
  }, []);

  const addData = () => {
    navigate("/addUser");
  }

  const handleDelete = (ID) => {
    deleteUserData(ID)
      .then((res) => {
        console.log("User deleted successfully!", res);

        axios.get("http://localhost:2000/deleteData")
          .then((res) => {
            setState(res.data);
          })
          .catch((error) => {
            console.error("Error fetching updated data:", error);
          });
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });

    const deleteUser = state.filter((user) => user.id !== ID.id);
    setState(deleteUser);
  }

  const handleUpdate = (userUpdate) => {
    setSelectedUser(userUpdate);

  };

  // const handleUpdateChange = (e) => {
  //   setUpdateChanges((prevChanges) => ({ ...prevChanges, [e.target.name]: e.target.value }));
  // };

  const handleUpdateChange = (e) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSaveChanges = () => {

    axios.put("http://localhost:2000/updateuser/" + selectedUser._id, selectedUser)
      .then((res) => {
        console.log("User updated successfully!", res);

        // Check the updated state
        console.log("Updated State", state);
      })
      .catch((error) => {
        console.log("Error updating user:", error);
      });
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className='mt-5 mb-4'>
            <h1 className='text-center'>User Data</h1>
          </div>
          <div className='text-end mb-4'><button className='btn btn-primary' onClick={addData}>Add Data</button></div>
          <div className="table-responsive">
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
                      <tr key={item._id}>
                        <th>{index}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td className='text-center'><button className='btn btn-danger' onClick={() => { handleDelete(item._id) }}>Delete</button>
                          <button type="button" className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleUpdate(item) }}>Update</button></td>
                      </tr>
                    </>
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <input type='text' name="name" value={selectedUser.name || ''} onChange={(e) => { handleUpdateChange(e) }} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <input type='email' name="email" value={selectedUser.email || ''} onChange={(e) => { handleUpdateChange(e) }} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <input type='password' name="password" value={selectedUser.password || ''} onChange={(e) => { handleUpdateChange(e) }} className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
