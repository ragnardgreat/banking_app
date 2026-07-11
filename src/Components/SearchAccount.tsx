import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Person } from '../Models/Person'
import './SearchAccount.css'

function SearchAccount() {
    const id = useParams().id
    const [data, setData] = useState<Person>()
    const [funds, setFunds] = useState<GLfloat>()
    const [sendFunds, setSendFunds] = useState<GLfloat>()
    const [message, setMessage] = useState<string>()
    const [status, setStatus] = useState<boolean>()


    const payload = {
        from: parseInt(localStorage.getItem("id")!),
        to: data?.id,
        amount: funds
    }

    const messagePayload = {
        sender: data?.id,
        receiver: parseInt(localStorage.getItem("id")!),
        amount: sendFunds,
        message: message
    }



    useEffect(() => {
        fetch(`http://localhost:5000/search/found/${id}`).then(res => res.json()).then(json => setData(json))
    }, [id])

    //Check user login status

    function statusCheck() {
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
                    window.location.href = "/account"
                    return
                }
                else {
                    setStatus(json)
                }
            })
    }

    useEffect(() => {
        statusCheck()
    }, [])

    function inputCheck() {
        if (funds) {
            if (containsAnomaly(funds!.toString())) {
                alert("Funds amount includes letters or symbols")
                return false
            }
            if (funds! <= 0) {
                alert("Can't send or recieve 0 or less")
                return false
            }
            return true
        }
        if (sendFunds) {
            if (containsAnomaly(sendFunds!.toString())) {
                alert("Funds amount includes letters or symbols")
                return false
            }
            if (sendFunds! <= 0) {
                alert("Can't send or recieve 0 or less")
                return false
            }
            return true
        }

    }

    function containsAnomaly(str: string) {
        return /[a-z]/i.test(str);
    }

    function sendTransfer() {
        if (status) {
            fetch("http://localhost:5000/transfer", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            }).then(res => {
                if (res.status == 200) {
                    alert('Funds sent sucesfully')
                    window.location.href = "/account"
                }
            }).catch(err => console.log(err))
        }

    }

    function requestTransfer() {
        if (status) {
            fetch("http://localhost:5000/message/request", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(messagePayload)
            }).then(res => {
                if (res.status == 200) {
                    alert('Request Sent')
                    window.location.href = "/account"
                }
            }).catch(err => console.log(err))
        }

    }

    return (<>
        <div id="accountContainer">
            <h1 id="balance">{data ? data.username : "No Data"}</h1>
            <div id="fundsContainer">
                <div id="sendFundsContainer">
                    <label>Send Funds:</label>
                    <p><input className='fundInput' onChange={(e) => { setFunds(parseFloat(e.target.value)) }}></input>$</p>
                    <button className='requestButton' onClick={() => { if (inputCheck()) { sendTransfer() } }}>Send funds</button>
                </div>
                <div id="requestFundsContainer">
                    <label>Reuest Funds:</label>
                    <p><input className='fundInput' onChange={(e) => { setSendFunds(parseFloat(e.target.value)) }}></input>$</p>
                    <label>Message:</label>
                    <textarea id='requestMessage' onChange={(e) => { setMessage(e.target.value) }}></textarea><br />
                    <button className='requestButton' onClick={() => { if (inputCheck()) { requestTransfer() } }}>Request Funds</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default SearchAccount