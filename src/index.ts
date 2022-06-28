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
    req: { body: { text: any } },
    res: { send: (arg0: string) => void }
  ) {
    const short = shortid.generate();
    await prisma.uRL.create({
      data: {
        originalUrl: req.body.text,
        shortUrl: short,
        usedCount: 0,
      },
    });
    console.log(req.body.text);
    res.send("http://localhost:3000/s/" + short);
  }
);

app.get("/s/:id", async function (req) {
  console.log(req);
});

app.listen(3001);
