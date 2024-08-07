import { prisma } from "../../../index";
import { Request, Response } from "express";
import { UserNoPassword } from "../models";
import { Role, UserRole } from "@prisma/client";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).send({ users }).end();
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

const getMe = async (req: Request, res: Response) => {
    try {
        const { id } = req.user!; // force
        const dbUser = await prisma.user.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                roles: true,
            },
        });
        const {
            password,
            roles,
            ...user
        }: { password: string; roles: UserRole[] } & UserNoPassword = dbUser;
        res.status(200).send({ user });
    } catch (err) {
        res.status(404).send({ message: "User not found!" });
    }
};

export { getAllUsers, getUserById, getMe };
