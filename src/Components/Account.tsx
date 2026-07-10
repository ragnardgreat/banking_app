import { useEffect, useState } from 'react'
import type { Person } from '../Models/Person'
import "./Account.css"

function Account() {
    const [data, setData] = useState<Person>()
    const [status, setStatus] = useState<boolean>()
    const [addAmount, setAddAmount] = useState<GLfloat | undefined>()

    useEffect(() => {
        //Resets page when logging out and going back
        window.addEventListener('pageshow', (event) => {
            if (event.persisted || localStorage.getItem("id") == null) {
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
            <div id='accountContainer'>
                {localStorage.getItem("id") && data ?
                    <>
                        <div id='balance'>
                            {/*For debugging and shocase purposes */}

                            {/* <input id='addFunds' onChange={(e) => { setAddAmount(Number(e.target.value)) }}></input>
                            <button onClick={() => { addFunds() }}>Add Funds</button><br />" */}
                            {data ? data.username : "No Data"}<br />
                            Balance: {data ? " $" + data.balance : "No Data"}<br />
                            {data ? <button id='logOut' onClick={() => { userLogout(data.id) }}>Log out</button> : "No Data"}<br />
                        </div>
                    </> : null}
            </div>
            <div id='transactionHistory'>
                <div className='transactionItem'>
                    <h1 >from: Someone</h1>
                    <h1>to: Someone</h1>
                    <h1>Amount</h1>
                </div>
                
            </div>
        </>
    )
}

export default Account