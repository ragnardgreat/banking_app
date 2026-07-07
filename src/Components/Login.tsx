import { useState } from 'react'

function Login() {

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

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
        if (json.status) {
          alert("Password or username is incorrect")
          return
        }
        localStorage.setItem("id", json.id)
        localStorage.setItem("token", json.token)
        window.location.href = "/account"
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