import React, { useEffect, useState } from 'react'
import type { Message } from '../Models/Message'

function Messages() {

    const [data, setData] = useState<Message[]>()
    const [status, setStatus] = useState<boolean>()


    useEffect(() => {
        fetch(`http://localhost:5000/messages/${localStorage.getItem("id")}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(localStorage.getItem("token"))
        }).then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error(err))
    }, [])

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

    function sendMoney(id: number, sender: number, reciever: number, amount: number) {
        const payload = {
            from: sender,
            to: reciever,
            amount: amount
        }
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
                    fetch("http://localhost:5000/message/confirm", {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify(id)
                    })
                }
            }).then(() => { window.location.reload() }).catch(err => console.log(err))
        }

    }

    function declineReqeust(id: number) {
        if (status) {
            fetch("http://localhost:5000/message/confirm", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(id)
            }).then(() => { window.location.reload() })
        }

    }

    function showMessages() {
        if (data && data.length != 0) {
            return (
                <>
                    {data.map(message =>
                        <>
                            <div key={message.id} className='searchResult'>{message.amount}$ {message.message}</div>
                            <button onClick={() => { sendMoney(message.id, message.senderId, message.receiverId, message.amount) }}>Send Money</button>
                            <button onClick={() => { declineReqeust(message.id) }}>Decline request</button>
                        </>
                    )}
                </>
            )

        }
        else {
            return (
                <>
                    <div id='noUsersMsg'>No new messages</div>
                </>)
        }
    }

    return (<>
        {data ? showMessages() : null}
    </>
    )
}

export default Messages