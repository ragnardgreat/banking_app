import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './Components/Header'
import Home from './Components/Home'
import Account from './Components/Account'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
    return (<>
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/account/:id' element={<Account />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    </>
    )
}

export default App