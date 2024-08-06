import { User } from "@prisma/client";

type UserNoPassword = Omit<User, "password">;

// these should eventually not be optionals
interface TokenUser extends UserNoPassword {
    accessToken?: string;
    refreshToken?: string;
}

export { UserNoPassword, TokenUser };
