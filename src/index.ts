import express from "express";
const cors = require("cors");
import bodyparser from "body-parser";
import { PrismaClient } from "@prisma/client";
const shortid = require("shortid");

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

//runs when the user sends through a url they want shortened
app.post(
  "/shorten-url",
  async function (
    req: { body: { text: string } },
    res: { send: (arg0: string) => void }
  ) {
    //check needed here to make sure the url has a http:// or https:// at it's start
    const short = shortid.generate();
    await prisma.uRL.create({
      data: {
        originalUrl: req.body.text,
        shortUrl: short,
        usedCount: 0,
      },
    });
    console.log(req.body.text);
    res.send("http://localhost:3000/" + short);
  }
);

app.post("/s", async function (req: { body: { text: string } }, res) {
  const result = await prisma.uRL.findUnique({
    where: {
      shortUrl: req.body.text,
    },
  });
  //if the result is unsuccessful a 404 is sent to the user
  if (!result) {
    res.status(404).send();
    return;
    //if a result is found, sends the original url back to the user and increments the counter on the db
  } else {
    res.send(result.originalUrl);
    //adds a increment to the database to show how many times the shortened url was used
    await prisma.uRL.update({
      where: {
        shortUrl: result.shortUrl,
      },
      data: {
        usedCount: { increment: 1 },
      },
    });
  }
});

app.listen(3001);
