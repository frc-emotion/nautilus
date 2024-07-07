import { prisma } from "../../..";
import { Request, Response } from "express";
import { generateToken } from "../helpers";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
    const { firstname, lastname, username, email, phone, password } = req.body;

    // require all fields
    if (!firstname || !lastname || !username || !email || !phone || !password) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }

    // require unique email, username, phone
    if (await prisma.user.findUnique({ where: { email } })) {
        return res.status(400).json({ message: "Email is already in use" });
    }
    if (await prisma.user.findUnique({ where: { phone } })) {
        return res.status(400).json({ message: "Phone is already in use" });
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
