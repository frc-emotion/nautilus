import { prisma } from "../../index";
import { Request, Response } from "express";

// assume protected
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: {
                id: id
            },
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({
            message: "User not found",
        });
    }
}

export default deleteUser;