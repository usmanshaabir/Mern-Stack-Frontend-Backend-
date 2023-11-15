import axios from 'axios'
import React, { useState, useEffect } from 'react'

const initState = { email: '', password: '' }
export default function SignIn() {
    const [state, setState] = useState(initState)
    const [stateChange, setStateChange] = useState(true)


    const handleChange = (event) => {
        setState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
    }
    useEffect(() => {
        // Reset the state here
        setState(initState);
    }, []);

    const handleRegister = (event) => {
        event.preventDefault();
        if (state.email.trim() === '' || state.password.trim() === '') {
            console.log("Sorry");
        } else {
            axios.post("http://localhost:2000/auth/userRegister", state)
                .then((response) => {
                    console.log("User Register Successfully!", response)
                    setStateChange(false)
                    setState(initState)

                })
                .catch((error) => {
                    console.log("User not Register", error)

                })
        }


    }
    const handleLogin = (event) => {
        event.preventDefault()

        axios.post("http://localhost:2000/auth/userLogin", state)
            .then((response) => {
                console.log("User Loggin Successfully!", response)
            })
            .catch((error) => {
                console.log("User not Loggin ", error)
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" value={state.email} name="email" className="form-control" onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={state.password} name="password" className="form-control" onChange={handleChange} />
                        </div>
                        {
                            stateChange ? <button type="submit" className="btn btn-primary" onClick={handleRegister}>Register</button> :
                                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}
