// app.js (or server.js)
const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const connection = require("./db");
const authRoutes = require("./routes/authRoutes");


app.use(bodyParser.json());
app.use("/auth", authRoutes);
// database connection
connection();

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));