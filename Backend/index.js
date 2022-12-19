const express = require ("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;


const db = mysql.createConnection({
    host:"localhost",
    user: "root", 
    password: "password",
    database: "books"
})
db.connect(function(err){
    if(err) throw err;
    console.log("database connected");
   
})
app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.json("I m back on nodejs");
    // console.log("I m back on nodejs");
})

app.get("/collection", (req,res)=>{
    const q = "Select * from collection";
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/collection", (req,res)=>{
    const q = "INSERT INTO collection (`name`, `address`) VALUES (?)"
    const values = [
    req.body.name,
    req.body.address
]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("successfully created")
    })
})


app.listen(port, ()=>{
    console.log(`server in connected ${port}`);
})



