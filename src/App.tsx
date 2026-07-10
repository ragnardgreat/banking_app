import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './Components/Header'
import Home from './Components/Home'
import Account from './Components/Account'
import Login from './Components/Login'
import Register from './Components/Register'
import UserSearch from './Components/UserSearch'
import SearchAccount from './Components/SearchAccount'
import Messages from './Components/Messages'
import "./App.css"

function App() {
    const currentId = localStorage.getItem("id")
    window.addEventListener("storage", () => {
        if (localStorage.getItem("id") == null) {
            return
        }
        else {
            localStorage.clear()
            fetch(`http://localhost:5000/logout/${currentId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST"
            }).then(() => { window.location.href = "/" }).catch(err => console.log(err))
        }
    })
    return (<>
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<Account />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<UserSearch />} />
                <Route path='/search/:id' element={<SearchAccount />} />
                <Route path='/messages' element={<Messages/>}/>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App