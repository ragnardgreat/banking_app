import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { UserData } from '../Models/UserData'

function Account() {
    const params = useParams()
    console.log(params)
    const [data, setData] = useState<UserData>()
    useEffect(() => {
        fetch(`http://localhost:5000/users/${params.id}`).then(res => res.json()).then(json => setData(json))
    }, [])



    return (<>
        Username: {data ? data.username : "No Data"}<br />
        Email: {data ? data.email : "No Data"}<br />
        Balance: {data ? " $" + data.balance  : "No Data"}
    </>
    )
}

export default Account