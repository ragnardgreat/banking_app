const express = require('express')
const app = express()
const conrs = require("cors")

app.get('/', (req,res)=>{
        res = fetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=5a0c282ff1dc4f86b45ecf245f0c78bc");
        let data = awaitres.json();
        console.log(data)
    
    }
    
)

app.listen(8080, ()=>{
    console.log("Server Running on port 8080")
})