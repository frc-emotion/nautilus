import { Request, Response } from "express";

// simple logout function that clears the token cookie
const logout = async (req: Request, res: Response) => {
    try {
        res.status(200).clearCookie("token").send();
    } catch (error) {
        res.status(500).send({ message: `Internal server error; ${error}` });
    }
};

export default logout;
