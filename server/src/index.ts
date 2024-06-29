import express, { Express } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const colors = require("colors");
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
export const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// TODO: Stop app and return errors if prisma and required env vars are not available

app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", require("./users/router"));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(
        colors.white(`[server]: Server is running at `) +
            colors.white.underline(`http://localhost:${port}`)
    );
});
