import { Link } from 'react-router'
import "./Header.css"

function Header() {
    return (<>
        <nav id='navBar'>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to='/search'>Search</Link>
        </nav>

    </>
    )
}

export default Header