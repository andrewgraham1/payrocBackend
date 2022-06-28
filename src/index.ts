import express from "express";
const cors = require("cors");
import bodyparser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyparser.json());

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//Work for tomorrow, look into prisma to handle database for you, similar to entity framework. Find something that creates a unique id like nano library
//To do, when user sends through post. Save original link to table. create new link and save to table. when user inputs new link, look at table to redirect user to original link
//add count to table
//table structure:
//Unique created id / original link / times used
app.post(
  "/shorten-url",
  function (
    req: { body: { text: any } },
    res: { send: (arg0: string) => void }
  ) {
    console.log(req.body.text);
    res.send("Hello World");
  }
);

app.listen(3001);
