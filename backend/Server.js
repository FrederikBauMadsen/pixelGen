const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://username:keklolkek@items.igz5x.mongodb.net/Characters")

app.use("/", require("./routes/itemRoute"))

app.listen(3001, function(){
    console.log("express server is running port 3001")
})
