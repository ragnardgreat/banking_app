import { useState } from 'react'
import { Link } from 'react-router'
import type { SearchResult } from '../Models/SearchResult'

function UserSearch() {

    const [username, setUsername] = useState<string>()
    const [data, setData] = useState<SearchResult[]>()


    function userSearch() {
        fetch(`http://localhost:5000/search/${username}`)
            .then(res => res.json())
            .then(json => setData(json))
    }

    function showUsers() {
        if (data && data.length != 0) {
            return (
                <>
                    {data.map(user => <><div key={user.id} className='searchResult' ><p className='searchName'>{user.username}</p> <Link to={`/search/${user.id}`}><button className='accountBtn'>Account</button></Link></div></>)}
                </>
            )

        }
        else {
            return (
                <>
                    <div id='noUsersMsg'>No users</div>
                </>)
        }
    }


    return (<>
        {localStorage.getItem("id") ?
            <>
                <label htmlFor="searchBar">Search for users to send/request money:</label><br />
                <input onChange={(e) => { setUsername(e.target.value) }} type='string' id='searchBar' name='searchBar'></input>
                <button onClick={() => { userSearch() }}>Search</button>
                <div id='resultsContainer'>
                    {showUsers()}
                </div>
            </> :
            <div id='pleaseLoginContainer'>
                <h1>Please Login to use Search</h1>
                <Link to="/login">Login</Link>
            </div>}
    </>
    )
}

export default UserSearch