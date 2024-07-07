import { prisma } from "../../../index";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({
            message: "No users found",
        });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({
            message: "User not found",
        });
    }
};

export { getAllUsers, getUserById };
