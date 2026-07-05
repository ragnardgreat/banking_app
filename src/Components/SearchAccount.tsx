import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Person } from '../Models/Person'

function SearchAccount() {
    const id = useParams().id
    const [data, setData] = useState<Person>()
    const [funds, setFunds] = useState<GLfloat>()
    const [request, setRequest] = useState<GLfloat>()
    const [message, setMessage] = useState<String>()


    const payload = {
        from: parseInt(localStorage.getItem("id")!),
        to: data?.id,
        amount: funds
    }

    const messagePayload = {
        sender: data?.id,
        receiver: parseInt(localStorage.getItem("id")!),
        amount: funds,
        message: message
    }

    useEffect(() => {
        fetch(`http://localhost:5000/search/found/${id}`).then(res => res.json()).then(json => setData(json))
    }, [id])

    if (data) {
        console.log(messagePayload)
    }

    function sendTransfer() {
        fetch("http://localhost:5000/transfer", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        }).catch(err => console.log(err))
    }

    function requestTransfer() {
        fetch("http://localhost:5000/message/request", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(messagePayload)
        }).catch(err => console.log(err))
    }

    return (<>
        Username: {data ? data.username : "No Data"}<br />
        <label>Funds:</label>
        <input onChange={(e) => { setFunds(parseFloat(e.target.value)) }}></input><br />
        <label>Message:</label>
        <input onChange={(e) => { setMessage(e.target.value) }}></input><br />
        <button onClick={() => { sendTransfer()}}>Send funds</button>
        <button onClick={() => { requestTransfer()}}>Request Funds</button>
    </>
    )
}

export default SearchAccount