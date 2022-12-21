const express = require ("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;


const db = mysql.createConnection({
    host:"localhost",
    user: "root", 
    password: "password",
    database: "test"
})
db.connect(function(err){
    if(err) throw err;
    console.log("database connected");
   
})
app.use(express.json())
app.use(cors())


// app.get("/", (req,res)=>{
//     res.json("I m back on nodejs");
//     // console.log("I m back on nodejs");
// })

app.get("/", (req,res)=>{
    const q = "Select * from books";
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?)"
    const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("successfully created")
    })
})

app.delete("/delete/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId], (err,result)=>{
        if(err) return res.json(err)
        return res.json("successfully deleted");
    } )
})

app.put("/update/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ?, WHERE id = ?";
   
    const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
    ]

    db.query(q,[...values,bookId], (err,result)=>{
        if(err) return res.json(err)
        return res.json("successfully updated");
    } )
})


app.listen(port, ()=>{
    console.log(`server in connected ${port}`);
})



