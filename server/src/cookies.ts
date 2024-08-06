import { CookieOptions } from "express";

/**
 *
 * @param age Age of the cookie in milliseconds, default is 10 years
 * @returns Express CookieOptions object
 */
export const cookieOptions = (age?: number): CookieOptions => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: age ? age : 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    };
};
