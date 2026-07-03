import React from 'react'
import { useState } from 'react'

function Register() {
    const [email, setEmail] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [fName, setfName] = useState<string>()
    const [lName, setlName] = useState<string>()

    const payload = {
        email: email,
        username: username,
        password: password,
        firstName: fName,
        lastName: lName,
        logged:false
    }

    function registerUser() {
        if (email == null || password == null || username == null || fName == null || lName == null) {
            alert("Missing fields")
        }
        else {
            fetch(`http://localhost:5000/newuser`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            }).then(res => console.log(res))
        }
    }


    return (<>
        <button onClick={(() => { console.log(payload) })}>Check Payload</button>
        <div id='userInputContainer'>
            <label htmlFor='email'>Email:</label>
            <input onChange={(e) => { setEmail(e.target.value) }} name='email' id='email'></input><br />
            <label htmlFor='username'>Username:</label>
            <input onChange={(e) => { setUsername(e.target.value) }} name='username' id='username'></input><br />
            <label htmlFor='password'>Password:</label>
            <input onChange={(e) => { setPassword(e.target.value) }} name='password' type='password' id='usernpasswordame'></input><br />
            <label htmlFor='fName'>First name:</label>
            <input onChange={(e) => { setfName(e.target.value) }} name='fName' id='fName'></input><br />
            <label htmlFor='lName'>Last name:</label>
            <input onChange={(e) => { setlName(e.target.value) }} name='lName' id='lName'></input><br />
            <button onClick={(() => { registerUser() })}>Register</button>
        </div>

    </>
    )
}

export default Register