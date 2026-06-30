import React from 'react'
import { useEffect, useState } from 'react'

function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [userData, setUserData] = useState()

  const payload = {
    password: password
  }

  function login() {
    fetch(`http://localhost:5000/login/${username}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(json => {
        setUserData(json);
        localStorage.setItem("id", json.id)
        window.location.href = "/"
      })
      .catch(err => { console.log(err) })
  }

  return (<>
    <label htmlFor='username'>Username:</label>
    <input onChange={(e) => { setUsername(e.target.value) }} name='username' id='username'></input><br />
    <label htmlFor='password'>Password:</label>
    <input onChange={(e) => { setPassword(e.target.value) }} name='password' type='password' id='usernpasswordame'></input><br />
    <button onClick={(() => { login() })}>Log in</button>
  </>
  )
}

export default Login