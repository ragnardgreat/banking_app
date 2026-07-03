import React, { useEffect } from 'react'
import { useParams } from 'react-router'

function SearchAccount() {
    const id = useParams()

    useEffect(() => {
        console.log(id)
    }, [id])

    return (
        <div>SearchAccount</div>
    )
}

export default SearchAccount