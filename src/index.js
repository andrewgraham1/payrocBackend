const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyparser.json());

//Work for tomorrow, look into prisma to handle database for you, similar to entity framework. Find something that creates a unique id like nano library
//To do, when user sends through post. Save original link to table. create new link and save to table. when user inputs new link, look at table to redirect user to original link
//add count to table
//table structure:
//Unique created id / original link / times used
app.post("/shorten-url", function (req, res) {
  console.log(req.body.text);
  res.send("Hello World");
});

app.listen(3001);
