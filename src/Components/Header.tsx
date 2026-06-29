import React from 'react'
import { Link } from 'react-router'

function Header() {
    return (<>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/account/4">Account</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </nav>

    </>
    )
}

export default Header