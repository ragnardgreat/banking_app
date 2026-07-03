import { useEffect, useState } from 'react'
import type { Person } from '../Models/Person'

function Account() {
    const [data, setData] = useState<Person>()
    const [status, setStatus] = useState<boolean>()
    useEffect(() => {
        if (localStorage.getItem("id") == null) {
            window.location.href = "/login"
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
                        fetch(`http://localhost:5000/users/${localStorage.getItem("id")}`)
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
            fetch(`http://localhost:5000/logout/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).catch(err => console.log(err))
        }
    }


    return (
        <>
            {data ? <button onClick={() => { userLogout(data.id) }}>Log out</button> : "No Data"}<br />
            Username: {data ? data.username : "No Data"}<br />
            Email: {data ? data.email : "No Data"}<br />
            Balance: {data ? " $" + data.balance : "No Data"}
        </>
    )
}

export default Account