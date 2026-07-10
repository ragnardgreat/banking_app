import { Link } from 'react-router'
import "./Header.css"

function Header() {
    return (<>
        <nav id='navBar'>
            <div id='logoContainer'>
                <img src='hatlogo.webp' width={300}></img>
            </div>
            <div id='navLinks'>
                <Link className='navItem' to="/">Home</Link>
                {localStorage.getItem("id") ? <Link className='navItem' to="/account">Account</Link> : <></>}
                {localStorage.getItem("id") ? <Link className='navItem' to="/messages">Messages</Link> : <></>}
                {localStorage.getItem("id") ? <Link className='navItem' to='/search'>Search</Link> : <></>}
                {localStorage.getItem("id") ? <></> : <Link className='navItem' to="/register">Register</Link>}
                {localStorage.getItem("id") ? <></> : <Link className='navItem' to="/login">Login</Link>}
            </div>

        </nav>

    </>
    )
}

export default Header