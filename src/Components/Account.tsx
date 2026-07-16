import { useEffect, useState } from 'react'
import type { Person } from '../Models/Person'
import "./Account.css"

function Account() {
    const [data, setData] = useState<Person>()
    const [status, setStatus] = useState<boolean>()
    // const [addAmount, setAddAmount] = useState<number | undefined>()

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
                        fetch(`http://localhost:5000/account/${localStorage.getItem("id")}?token=${localStorage.getItem("token")}`)
                            .then(res => res.json())
                            .then(json => setData(json))
                    }
                }
            }).catch(err => console.error(err))

    }, [status])

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
                    window.location.href = "/"
                    return
                }
                else {
                    setStatus(json)
                }
            })
    }
    useEffect(()=>{
        statusCheck()
    }, [])


    function userLogout(id: string) {
        if (data) {
            fetch(`http://localhost:5000/logout/${id}?token=${localStorage.getItem("token")}`, {
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

    // function addFunds() {
    //     const payload = {
    //         id: localStorage.getItem("id"),
    //         amount: addAmount
    //     }

    //     fetch(`http://localhost:5000/addfunds`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: (JSON.stringify(payload))
    //     }).then(() => { alert('Funds added sucsfully'); window.location.reload() })
    //         .catch(err => console.log(err))
    // }


    return (
        <>
            {data ? <div id='accountContainer'>
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