import React from 'react'
import { useState } from 'react'
import './Register.css'
import AlertBox from './AlertBox';

function Register() {
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fName, setfName] = useState<string>('')
    const [lName, setlName] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [alertMsg, setAlertMsg] = useState<{ title: string, content: string }>()

    const payload = {
        email: email,
        username: username,
        password: password,
        firstName: fName,
        lastName: lName
    }

    function validateRegisterData() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!username.trim()) {
            setErrorMessage("Please enter a username")
            return false
        }

        if (!email.trim()) {
            setErrorMessage("Please enter an email")
            return false
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address")
            return false
        }

        if (!password.trim() || password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long")
            return false
        }

        if (!fName.trim()) {
            setErrorMessage("Please enter your first name")
            return false
        }

        if (!lName.trim()) {
            setErrorMessage("Please enter your last name")
            return false
        }

        return true
    }

    function registerUser() {
        if (!validateRegisterData()) {
            return
        }

        fetch(`http://localhost:5000/newuser`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        }).then(res => {
            console.log(res)
            if (res.ok) {
                if (document.getElementById("alertBox")) {
                    document.getElementById("alertBox")!.style.display = "block"
                }
                setAlertMsg({
                    title: "User Created",
                    content: "New User Created Succesfully"
                })
            }
            else {
                setErrorMessage("Username is already taken")
            }
        }
        ).catch(err => console.log(err))

    }


    return (<>
        {alertMsg && <AlertBox title={alertMsg.title} content={alertMsg.content} active={true} />}
        <div id="registerContainer">
            <h1 id='registerText'>Register</h1>
            {errorMessage && <p id='registerError'>{errorMessage}</p>}
            <label htmlFor='username'>Username:</label>
            <input autoComplete="off" onChange={(e) => { setUsername(e.target.value); }} name='username' id='username'></input><br />
            <label htmlFor='password'>Password:</label>
            <input autoComplete="off" onChange={(e) => { setPassword(e.target.value); }} name='password' type='password' id='usernpasswordame'></input><br />
            <label htmlFor='email'>Email:</label>
            <input autoComplete="off" onChange={(e) => { setEmail(e.target.value); }} name='email' id='email'></input><br />
            <label htmlFor='fName'>First name:</label>
            <input autoComplete="off" onChange={(e) => { setfName(e.target.value); }} name='fName' id='fName'></input><br />
            <label htmlFor='lName'>Last name:</label>
            <input autoComplete="off" onChange={(e) => { setlName(e.target.value); }} name='lName' id='lName'></input><br />
            <button onClick={() => { registerUser(); }}>Register</button>
        </div>
    </>
    )
}

export default Register