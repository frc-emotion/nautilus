import { prisma } from "../../..";
import { Request, Response } from "express";
import { generateToken } from "../helpers";
import validateEmail from "../helpers/validateEmail";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
    const { firstname, lastname, username, email, phone, password } = req.body;

    // require all fields
    if (!firstname || !lastname || !username || !email || !phone || !password) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }

    if (!validateEmail(email)) {
        const msg = "Invalid email address";
        return res
            .status(400)
            .json({ message: msg, fields: [{ name: "email", message: msg }] });
    }

    // require unique email, username, phone
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { phone }, { username }],
        },
    });

    if (existingUser) {
        let errorMessage = [];
        if (existingUser.email === email) {
            errorMessage.push({
                name: "email",
                message: "Email is already in use",
            });
        }
        if (existingUser.phone === phone) {
            errorMessage.push({
                name: "phone",
                message: "Phone number is already in use",
            });
        }
        if (existingUser.username === username) {
            errorMessage.push({
                name: "username",
                message: "Username is already in use",
            });
        }

        return res
            .status(400)
            .json({ message: "User is not unique", fields: errorMessage });
    }

    // attempt to create user & return
    else {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    username,
                    phone,
                    password: hashedPassword,
                    email,
                },
            });
            if (user) {
                let newUser = user as any;
                delete newUser.password;
                return res.status(201).json({
                    ...newUser,
                    token: generateToken(user.id),
                });
            } else {
                return res.status(400).json({ message: "Invalid user data" });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: `Internal server error: ${error}` });
        }
    }
};

export default register;
