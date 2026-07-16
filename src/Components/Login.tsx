import { useState } from 'react'
import "./Login.css"
import AlertBox from './AlertBox'

function Login() {

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [alertMsg, setAlertMsg] = useState<{ title: string, content: string }>()

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
    }).then(res => res.json()).then(json => {
      if (json.status) {
        setAlertMsg({
          title: "Error",
          content: "Password or username incorrect"
        })
      }
      else {

        localStorage.setItem("id", json.id)
        localStorage.setItem("token", json.token)
        window.location.href = "/account"
      }

    })
  }

  return (<>
    {alertMsg && <AlertBox title={alertMsg.title} content={alertMsg.content} active={false} />}
    <div id='loginContainer'>
      <h1 id="loginText">Login</h1>
      <label htmlFor='username'>Username:</label>
      <input autoComplete="off" onChange={(e) => { setUsername(e.target.value) }} name='username' id='username'></input><br />
      <label htmlFor='password'>Password:</label>
      <input autoComplete="off" onChange={(e) => { setPassword(e.target.value) }} name='password' type='password' id='usernpasswordame'></input><br />
      <button id='loginButton' onClick={() => { login() }}>Log in</button>
    </div>
  </>
  )
}

export default Login