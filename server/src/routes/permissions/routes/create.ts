import { prisma } from "../../..";

const createPermission = async (req, res) => {
    try {
        const { name, description, category } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: `Please fill in all fields. Missing ${!name && !description ? "name,  description" : !name ? "name" : "description"}`,
            });
        }

        const permission = await prisma.permission.create({
            data: {
                name,
                description,
                category,
            },
        });

        res.status(201).json(permission);
    } catch (e) {
        res.status(500).json({
            message: "Could not create permission",
        });
    }
};

export default createPermission;
