import React, { useEffect, useState } from 'react'
import type { Message } from '../Models/Message'
import './Messages.css'

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

    console.log(data)

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
                else if (res.status == 400) {
                    alert("Not Enough Funds")
                }
            }).catch(err => console.log(err))
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
            }).then(() => { alert("Request Declines"); window.location.reload() })
        }

    }

    function showMessages() {
        if (data && data.length != 0) {
            return (
                <>
                    {data.map(message =>
                        <>
                            <div className='messageContainer'>
                                <div key={message.id} className='messageContentContainer'>
                                    <div className="senderName">From: {message.senderName}</div><br />
                                    <div className='messageAmount'>Amount: ${message.amount} </div><br />
                                    <div className="messageMessage">Message:<br />{message.message}</div>
                                </div>
                                <div className='messageButtonsContainer'>
                                    <button className='acceptMessage messageButton' onClick={() => { sendMoney(message.id, message.senderId, message.receiverId, message.amount) }}>Accept</button>
                                    <button className='declineMessage messageButton' onClick={() => { declineReqeust(message.id) }}>Decline</button>
                                </div>
                            </div>

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
        <div id='messageList'>
            {data ? showMessages() : null}
        </div>
    </>
    )
}

export default Messages