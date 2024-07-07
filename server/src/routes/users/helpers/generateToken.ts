const jwt = require("jsonwebtoken");

/**
 * Generate a JWT for a given user
 * @param id User bearer of JWT
 * @returns JWT for given user id
 */
const generateToken = (id: string) => {
    // TODO: Need to add and handle expiration time
    return jwt.sign({ id }, process.env.JWT_SECRET!); // expiresIn: "1h"
};

export default generateToken;