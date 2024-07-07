import { PrismaClient, Permission } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// create seed permissions without an id
const SeedPermissions: Omit<Permission, "id">[] = [];

async function main() {
    // seed permissions
    for (let permission of SeedPermissions) {
        await prisma.permission.upsert({
            where: {
                name: permission.name,
            },
            update: {},
            create: {
                ...permission,
            },
        });
    }

    // seed root user
    await prisma.user.upsert({
        where: {
            username: "root",
        },
        update: {},
        create: {
            username: "root",
            email: "root@example.com",
            password: await bcrypt.hash("password", await bcrypt.genSalt(10)),
            firstname: "Root",
            lastname: "User",
            phone: "+10000000000",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect;
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect;
        process.exit(1);
    });
