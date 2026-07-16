import { useState } from 'react'
import { Link } from 'react-router'
import type { SearchResult } from '../Models/SearchResult'
import "./UserSearch.css"

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
                    {data.map(user => <><div key={user.id} className='searchResult' ><p className='searchName'>{user.username}</p> <Link className='accountSearchBtn' to={`/search/${user.id}`}>Account</Link></div></>)}
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
        <div id='searchContainer'>
            {localStorage.getItem("id") ?
                <>
                    <div id='searchContainer'>
                        <input autoComplete='off' onChange={(e) => { setUsername(e.target.value) }} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                userSearch()
                            }
                        }} type='string' id='searchBar' name='searchBar'></input>
                        <button id='searchButton' onClick={() => { userSearch() }}>Search</button>
                    </div>
                    <div id='resultsContainer'>
                        {showUsers()}
                    </div>
                </> :
                <div id='pleaseLoginContainer'>
                    <h1>Please Login to use Search</h1>
                    <Link to="/login">Login</Link>
                </div>}
        </div>
    </>
    )
}

export default UserSearch