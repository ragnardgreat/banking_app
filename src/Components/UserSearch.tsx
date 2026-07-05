import { useState } from 'react'
import { useNavigate, Link } from 'react-router'

function UserSearch() {

    const [username, setUsername] = useState<string>()
    const [data, setData] = useState()


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
        <label htmlFor="searchBar">Search for users to send money to:</label><br />
        <input onChange={(e) => { setUsername(e.target.value) }} type='string' id='searchBar' name='searchBar'></input>
        <button onClick={() => { userSearch() }}>Search</button>
        <div id='resultsContainer'>
            {showUsers()}
        </div>
    </>
    )
}

export default UserSearch