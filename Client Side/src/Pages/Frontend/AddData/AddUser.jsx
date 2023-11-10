import React, { useState } from 'react';
// import axios from 'axios';
import { saveUserData } from '../ApiService';


const initState = { name: "", email: "", password: "" }
export default function AddUser() {
    const [state, setState] = useState(initState)

    const handleChange = (event) => {
        setState((preState) => ({ ...preState, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const savedData = saveUserData(state);
            console.log('User data saved:', savedData);
            // Handle success, e.g., show a success message to the user.
        } catch (error) {
            // Handle the error, e.g., display an error message to the user.
            console.error('Failed to save user data:', error);
        }


    }
    return (
        <>
            <div className="container " style={{ maxWidth: "630px" }}>
                <div className="row mt-5">
                    <h1 className='text-center mb-5'>Add Data</h1>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="name" name="name" className="form-control" placeholder='Name Here' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" placeholder='Email Here' onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
