import express from "express";
import dotenv from "dotenv";
import { PrismaClient, User, Role } from "@prisma/client";

const colors = require("colors");
const bodyParser = require("body-parser");

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: User & { roles?: any[] };
        }
    }
}

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
export const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// TODO: Stop app and return errors if prisma and required env vars are not available

app.use(
    cors({
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        origin: "http://localhost:5173",
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", require("./routes/users/router"));

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(
        colors.white(`[server]: Server is running at `) +
            colors.white.underline(`http://localhost:${port}`)
    );
});
