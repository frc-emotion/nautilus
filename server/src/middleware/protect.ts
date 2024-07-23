import jwt from "jsonwebtoken";
// import { Role } from "@prisma/client";
// // import { Permissions } from "../types/permissions";
import { prisma } from "..";
import { Request, Response, NextFunction } from "express";

// const summarizePermissions = (roles: Role[]): Permissions => {
//     let summarized: Permissions = {};

//     for (let role of roles) {
//         if (!role.permissions) continue;
//         const permissions = role.permissions as Permissions;
//         for (let key in permissions) {
//             if (permissions[key as keyof Permissions]) {
//                 summarized[key as keyof Permissions] = true;
//             }
//         }
//     }

//     return summarized;
// };

// const comparePermissions = (
//     permission: Permissions,
//     summarized: Permissions
// ): boolean => {
//     for (let key in permission) {
//         if (
//             permission[key as keyof Permissions] &&
//             !summarized[key as keyof Permissions]
//         ) {
//             return false;
//         }
//     }

//     return true;
// };

function protect(
    // permission: Permissions,
    protecting: Function,
    fallback?: Function
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        let token;
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            if (fallback) return fallback(req, res, next);
            else return res.status(401).send({ message: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as { id: string };

            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
                include: {
                    roles: true,
                },
            });

            if (!user) {
                if (fallback) return fallback(req, res, next);
                else return res.status(403).send({ message: "Forbidden" });
            }

            // const permissions = summarizePermissions(user.roles);

            // if (!comparePermissions(permission, permissions)) {
            //     if (fallback) return fallback(req, res, next);
            //     else return res.status(403).send({ message: "Forbidden" });
            // }

            req.user = user;

            return protecting(req, res, next);
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Internal Server Error", dump: error });
        }
    };
}

export default protect;
