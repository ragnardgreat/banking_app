import { useEffect, useState } from 'react'
import type { Message } from '../Models/Message'
import AlertBox from './AlertBox';
import './Messages.css'
import { apiUrl } from '../config'

function Messages() {

    const [data, setData] = useState<Message[]>()
    const [status, setStatus] = useState<boolean>()
    const [alertMsg, setAlertMsg] = useState<{ title: string, content: string }>()

    useEffect(() => {
        fetch(`${apiUrl}/messages/${localStorage.getItem("id")}`, {
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
        fetch(`${apiUrl}/status/${localStorage.getItem("id")}`, {
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

    function sendMoney(sender: number, reciever: number, amount: number) {
        const payload = {
            from: sender,
            to: reciever,
            amount: amount
        }
        if (status) {
            fetch(`${apiUrl}/transfer`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            }).then(res => {
                if (res.ok) {
                    setAlertMsg({
                        title: "Transfer Succesful",
                        content: "Funds have been succesfully sent!"
                    });
                }
                return res.json()
            }).then(json => {
                console.log(json)
                if (json.message.includes("409 CONFLICT")) {
                    setAlertMsg({
                        title: "Transfer Failed",
                        content: "Can't go over transfer limit"
                    });
                }
                if (json.message.includes("400 BAD_REQUEST")) {
                    setAlertMsg({
                        title: "Transfer Failed",
                        content: "Not enough money"
                    });
                }
            })
        }

    }

    function declineReqeust(id: number) {
        if (status) {
            fetch(`${apiUrl}/message/confirm`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(id)
            }).then(() => {
                setAlertMsg({
                    title: "Declined",
                    content: "Message has been declined"
                });
            }
            )
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
                                    <button className='acceptMessage messageButton' onClick={(e) => { sendMoney(message.senderId, message.receiverId, message.amount); e.currentTarget.disabled = true; }}>Accept</button>
                                    <button className='declineMessage messageButton' onClick={(e) => { declineReqeust(message.id); e.currentTarget.disabled = true; }}>Decline</button>
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
        {alertMsg && <AlertBox title={alertMsg.title} content={alertMsg.content} active={true} />}
        <div id='messageList'>
            {data ? showMessages() : <h1 id="loadingText">Loading...</h1>}
        </div>
    </>
    )
}

export default Messages