import { useEffect, useState } from 'react'
import type { Person } from '../Models/Person'
import { Link } from 'react-router'

function Account() {
    const [data, setData] = useState<Person>()
    const [status, setStatus] = useState<boolean>()
    const [addAmount, setAddAmount] = useState<GLfloat | undefined>()

    useEffect(() => {
        window.addEventListener('pageshow', (event) => {
            if (event.persisted || localStorage.getItem("id") == null) {
                console.log('This page was restored from the bfcache.');
                window.location.href = "/"
            }
        });
        if (localStorage.getItem("id") == null) {
            return
        }
        fetch(`http://localhost:5000/status/${localStorage.getItem("id")}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    alert('An error has occures')
                    localStorage.clear()
                    window.location.href = "/"
                    return
                }
                else {
                    setStatus(json)
                }
            })
            .then(() => {
                if (status) {
                    if (localStorage.getItem("id") != null) {
                        fetch(`http://localhost:5000/account/${localStorage.getItem("id")}?token=${localStorage.getItem("token")}`)
                            .then(res => res.json())
                            .then(json => setData(json))
                    }
                }
            })

    }, [status])


    function userLogout(id: string) {
        if (data) {
            localStorage.clear()
            window.location.href = "/"
            fetch(`http://localhost:5000/logout/${id}?token=${localStorage.getItem("token")}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).catch(err => console.log(err))
        }
    }

    function addFunds() {
        const payload = {
            id: localStorage.getItem("id"),
            amount: addAmount
        }

        fetch(`http://localhost:5000/addfunds`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: (JSON.stringify(payload))
        }).then(() => { alert('Funds added sucsfully'); window.location.reload() }).catch(err => console.log(err))
    }


    return (
        <>
            {localStorage.getItem("id") ?
                <>
                    {data ? <button onClick={() => { userLogout(data.id) }}>Log out</button> : "No Data"}<br />
                    Username: {data ? data.username : "No Data"}<br />
                    Email: {data ? data.email : "No Data"}<br />
                    Balance: {data ? " $" + data.balance : "No Data"}<br />
                    <input id='addFunds' onChange={(e) => { setAddAmount(Number(e.target.value)) }}></input>
                    <button onClick={() => { addFunds() }}>Add Funds</button>
                </> : <div id='pleaseLoginContainer'>
                    <h1>You are not logged in</h1>
                    <Link to="/login">Login</Link>
                </div>}
        </>
    )
}

export default Account