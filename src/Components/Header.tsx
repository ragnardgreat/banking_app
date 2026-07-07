import { Link } from 'react-router'
import "./Header.css"

function Header() {
    return (<>
        <nav id='navBar'>
            <Link to="/">Home</Link>
            {localStorage.getItem("id") ? <Link to="/account">Account</Link> : <></>}
            {localStorage.getItem("id") ? <Link to="/messages">Messages</Link> : <></>}
            {localStorage.getItem("id") ? <Link to='/search'>Search</Link> : <></>}
            {localStorage.getItem("id") ? <></> : <Link to="/register">Register</Link>}
            {localStorage.getItem("id") ? <></> : <Link to="/login">Login</Link>}
        </nav>

    </>
    )
}

export default Header