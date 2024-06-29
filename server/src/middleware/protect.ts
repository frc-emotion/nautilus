import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { prisma } from "..";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

function protect(permission: String, protecting: Function, fallback: Function) {
    return async function (req: Request, res: Response, next: NextFunction) {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                // separate token from Bearer
                token = req.headers.authorization.split(" ")[1];

                // verify jwt against secret
                const decoded = jwt.verify(token, process.env.JWT_SECRET!);

                // prisma user find equivalent
                req.user = await prisma.user.findUniqueOrThrow({
                    where: {
                        id: (decoded as { id: string }).id,
                    }
                })
            } catch (err) {
                // console.log(err);
                res.status(401).json({
                    message: "Not authorized, token failed",
                });
            }
        }

        if (!token) {
            res.status(401).json({
                message: "No token"
            });
        } else {
            // summarize user permissions

            // check if user has permission

            // if user has permission, call protecting, otherwise call fallback

            // if no fallback, return 403
        }
    };
}

export default protect