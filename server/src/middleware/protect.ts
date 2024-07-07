// import jwt from "jsonwebtoken";
// import { Role } from "@prisma/client";
// // import { Permissions } from "../types/permissions";
// import { prisma } from "..";
// import { Request, Response, NextFunction } from "express";

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

// function protect(
//     permission: Permissions,
//     protecting: Function,
//     fallback?: Function
// ) {
//     return async function (req: Request, res: Response, next: NextFunction) {
//         let token;

//         if (
//             req.headers.authorization &&
//             req.headers.authorization.startsWith("Bearer")
//         ) {
//             try {
//                 // separate token from Bearer
//                 token = req.headers.authorization.split(" ")[1];

//                 // verify jwt against secret
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET!);

//                 // prisma user find equivalent
//                 req.user = await prisma.user.findUniqueOrThrow({
//                     where: {
//                         id: (decoded as { id: string }).id,
//                     },
//                     include: {
//                         roles: true,
//                     },
//                 });
//             } catch (err) {
//                 // console.log(err);
//                 res.status(401).json({
//                     message: "Not authorized, token failed",
//                 });
//             }

//             if (
//                 comparePermissions(
//                     permission,
//                     summarizePermissions(req.user!.roles as Role[])
//                 )
//             ) {
//                 // user has permission
//                 protecting(req, res, next);
//             } else if (fallback) {
//                 // send user to fallback
//                 fallback(req, res, next);
//             } else {
//                 // no fallback
//                 res.status(403).json({
//                     message: "Forbidden",
//                 });
//             }
//         } else {
//             res.status(401).json({
//                 message: "No token",
//             });
//         }
//     };
// }

// export default protect;
