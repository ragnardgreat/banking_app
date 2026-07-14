import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Person } from '../Models/Person'
import './SearchAccount.css'

function SearchAccount() {
    const id = useParams().id
    const [data, setData] = useState<Person>()
    const [funds, setFunds] = useState<number>()
    const [sendFunds, setSendFunds] = useState<number>()
    const [message, setMessage] = useState<string>()
    const [status, setStatus] = useState<boolean>()




    useEffect(() => {
        if (localStorage.getItem("id") != null) {
            fetch(`http://localhost:5000/search/found/${id}`).then(res => res.json()).then(json => {
                if (json.message == "No value present") {
                    alert("No such user exists")
                    window.location.href = "/search"
                }
                else {
                    setData(json)
                }
            }).catch(err => console.log(err))
        }
        else {
            alert("Please Login")
            window.location.href = "/"
        }
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
                if (!json) {
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

    function inputCheck(value: number | undefined) {
        if (!value || isNaN(value) || value <= 0) {
            alert("Invalid amount")
            return false
        }
        return true
    }


    function sendTransfer() {
        if (!status || !data || !funds) {
            alert("Please fill in all fields")
            return
        }

        const payload = {
            from: parseInt(localStorage.getItem("id")!),
            to: data!.id,
            amount: funds!
        }

        fetch("http://localhost:5000/transfer", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        }).then(res => {
            if (res.ok) {
                alert('Funds sent sucesfully')
                window.location.href = "/account"
            }
            else if (res.status == 400) {
                alert("Not enough funds")
            }

        }).catch(err => console.log(err))


    }

    function requestTransfer() {
        if (!status || !data || !sendFunds) {
            alert("Please fill in all fields")
            return
        }

        const messagePayload = {
            sender: data?.id,
            receiver: parseInt(localStorage.getItem("id")!),
            amount: sendFunds,
            message: message
        }

        if (status) {
            fetch("http://localhost:5000/message/request", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(messagePayload)
            }).then(res => {
                if (res.ok) {
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
                    <button className='requestButton' onClick={() => { if (inputCheck(Number(funds))) { sendTransfer() } }}>Send funds</button>
                </div>
                <div id="requestFundsContainer">
                    <label>Request Funds:</label>
                    <p><input className='fundInput' onChange={(e) => { setSendFunds(parseFloat(e.target.value)) }}></input>$</p>
                    <label>Message:</label>
                    <textarea id='requestMessage' onChange={(e) => { setMessage(e.target.value) }}></textarea><br />
                    <button className='requestButton' onClick={() => { if (inputCheck(Number(sendFunds))) { requestTransfer() } }}>Request Funds</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default SearchAccount