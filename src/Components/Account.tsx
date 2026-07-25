import { useEffect, useState } from 'react'
import type { Person } from '../Models/Person'
import "./Account.css"
import AlertBox from './AlertBox'
import { apiUrl } from '../config'

function Account() {
    const [data, setData] = useState<Person>()
    const [status, setStatus] = useState<boolean>()
    const [addAmount, setAddAmount] = useState<number | undefined>()
    const [alertMsg, setAlertMsg] = useState<{ title: string, content: string }>()

    function isValidAmount(value: number | undefined) {
        return typeof value === 'number' && Number.isFinite(value) && value >= 0
    }

    useEffect(() => {
        //Resets page when logging out and going back
        window.addEventListener('pageshow', (event) => {
            if (event.persisted || localStorage.getItem("id") == null) {
                window.location.href = "/"
            }
        });
        window.removeEventListener('pageshow', (event) => {
            if (event.persisted || localStorage.getItem("id") == null) {
                window.location.href = "/"
            }
        })

        if (localStorage.getItem("id") == null) {
            return
        }
        fetch(`${apiUrl}/status/${localStorage.getItem("id")}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        })
            .then(res => res.json())
            .then(json => {
                if (!json) {
                    alert('An error has occured')
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
                    //I know this isn't safe, but this is for demonstrative purposes only
                    if (localStorage.getItem("id") != null) {
                        fetch(`${apiUrl}/account/${localStorage.getItem("id")}?token=${localStorage.getItem("token")}`)
                            .then(res => res.json())
                            .then(json => setData(json))
                    }
                }
            }).catch(err => console.error(err))

    }, [status])

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
                    window.location.href = "/"
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


    function userLogout(id: string) {
        if (data) {
            fetch(`${apiUrl}/logout/${id}?token=${localStorage.getItem("token")}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).then(() => {
                localStorage.clear()
                window.location.href = "/"
            }).catch(err => console.log(err))
        }
    }

    function addFunds() {
        if (!isValidAmount(addAmount)) {
            alert('Please enter a valid non-negative amount')
            return
        }

        const payload = {
            id: localStorage.getItem("id"),
            amount: addAmount,
            token: localStorage.getItem("token")
        }

        fetch(`${apiUrl}/addfunds`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: (JSON.stringify(payload))
        }).then(() => {
            setAlertMsg({
                title: "Transfer Succesful",
                content: "Funds have been succesfully sent!"
            });
        })
            .catch(err => console.log(err))
    }


    return (
        <>
            {alertMsg && <AlertBox title={alertMsg.title} content={alertMsg.content} active={true} />}
            {data ? <div id='accountContainer'>
                {localStorage.getItem("id") && data ?
                    <>
                        <div id='balance'>
                            {/*For debugging and shocase purposes */}
                            <label id='addFundsLabel' htmlFor="addFunds">(This is here for fun/testing, add as much as you want)</label><br />
                            <input
                                id='addFunds'
                                name="addFunds"
                                type="number"
                                min="0"
                                value={addAmount ?? ''}
                                onChange={(e) => {
                                    const parsedValue = Number(e.target.value)
                                    setAddAmount(e.target.value === '' ? undefined : parsedValue)
                                }}
                            ></input>
                            <button id='addFundsButton' onClick={() => { addFunds() }}>Add Funds</button><br />
                            {data ? data.username : "No Data"}<br />
                            Balance: {data ? " $" + data.balance : "No Data"}<br />
                            {data ? <button id='logOut' onClick={() => { userLogout(data.id) }}>Log out</button> : "No Data"}<br />
                        </div>
                    </> : null}
                {/* <div id='transactionHistory'>
                    <div className='transactionItem'>
                        <h1 >from: Someone</h1>
                        <h1>to: Someone</h1>
                        <h1>Amount</h1>
                    </div>

                </div> */}
            </div> : <h1 id="loadingText">Loading...</h1>}

        </>
    )
}

export default Account