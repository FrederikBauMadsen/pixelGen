require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("MONGO_URI is not set. Copy backend/.env.example to backend/.env and fill it in.");
    process.exit(1);
}
mongoose.connect(mongoUri).catch(function (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
});

app.use("/", require("./routes/itemRoute"))

app.listen(3002, function(){
    console.log("express server is running port 3002")
})
