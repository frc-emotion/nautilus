import { prisma } from "../../index";
import { Request, Response } from "express";
import { generateToken, validateEmail } from "../helpers";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res
                .status(400)
                .json({ message: "Please fill out all fields" });
        }

        let user;

        // check if username is an email
        if (validateEmail(username)) {
            console.log("email");
            user = await prisma.user.findUnique({
                where: {
                    email: username,
                },
            });
        } else {
            console.log("username");
            user = await prisma.user.findUnique({
                where: {
                    username,
                },
            });
        }

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" });
        } else {
            // check if rehash needed, then find and update
            const rounds = 12; // bcrypt rounds used when hashing the password
            const currentRounds = parseInt(user.password.split("$")[2]);

            if (currentRounds < rounds) {
                const newHash = await bcrypt.hash(password, rounds);
                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        password: newHash,
                    },
                });
            }

            user = user as any;
            delete user.password;
            // generate jwt and return user
            user.token = generateToken(user.id);
            return res.status(200).json(user);
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Internal server error: ${error}` });
    }
};

export default login;