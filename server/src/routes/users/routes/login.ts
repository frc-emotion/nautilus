import { prisma } from "../../../index";
import { Request, Response } from "express";
import { generateToken, validateEmail } from "../helpers";
import bcrypt from "bcrypt";
import { TokenUser, UserNoPassword } from "../models";
import { cookieOptions } from "../../../cookies";

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
            user = await prisma.user.findUnique({
                where: {
                    email: username,
                },
            });
        } else {
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
                .send({ message: "Invalid username or password" });
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

            user = user as UserNoPassword as TokenUser;
            // TODO: refresh token
            // generate access and return user
            user.accessToken = generateToken(user.id);
            return res
                .status(200)
                .cookie("token", user.accessToken, cookieOptions())
                .send({ user });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Internal server error: ${error}` });
    }
};

export default login;
