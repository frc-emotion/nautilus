import { prisma } from "../../../";
import { Request, Response } from "express";

const createRole = async (req: Request, res: Response) => {
    try {
        const { name, permissionNames } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required",
            });
        }

        if (permissionNames) {
            // create permissions
            if (Array.isArray(permissionNames)) {

            } else {
                return res.status(400).json({
                    message: "Permission names must be an array",
                });
            }
        }

        const role = await prisma.role.create({
            data: {
                name: name,
            },
        });

        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({
            message: "Could not create role",
        });
    }
};

export default createRole;
