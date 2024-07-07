import { Request, Response } from "express";
import { prisma } from "../../../index";

const updateProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.user!;

        // Don't allow these fields to be updated
        delete req.body.id;
        delete req.body.password;
        delete req.body.token;
        delete req.body.grade;

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                ...req.body,
            },
        });

        let updatedUser = updateUser as any;
        delete updatedUser.password; // don't return hashed password
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            message: "User not found",
        });
    }
};

// assume protected
const updateUserAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Don't allow these fields to be updated
        delete req.body.id;
        delete req.body.password;
        delete req.body.token;

        const updateUser = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                ...req.body,
            },
        });

        let updatedUser = updateUser as any;
        delete updatedUser.password;
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({
            message: "User not found",
        });
    }
};

export { updateProfile, updateUserAdmin };
