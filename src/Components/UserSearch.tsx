import { useEffect, useState } from 'react'

function UserSearch() {

    const [username, setUsername] = useState<string>()


    function userSearch(){
        fetch(`http://localhost:5000/users/${username}`)
    }



    return (<>
    <label htmlFor="searchBar">Search for users to send money to:</label><br/>
    <input onChange={(e)=>{setUsername(e.target.value)}} type='string' id='searchBar' name='searchBar'></input>
    <button onClick={()=>{}}>Search</button>
    </>
    )
}

export default UserSearch