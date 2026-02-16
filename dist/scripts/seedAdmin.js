import { prisma } from "../lib/prisma.js";
import { UserRole } from "../middleware/middleware.js";
async function seedAdmin() {
    try {
        const email = "admin1@gmail.com";
        const password = "admin111";
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            console.log("Admin already exists!");
            return;
        }
        const admin = await prisma.user.create({
            data: {
                name: "admin",
                email,
                role: UserRole.ADMIN,
                emailVerified: true,
            },
        });
        await prisma.account.create({
            data: {
                id: crypto.randomUUID(),
                providerId: "credential",
                accountId: admin.id,
                userId: admin.id,
                password,
            },
        });
        console.log("Admin user created successfully:", admin.email);
    }
    catch (err) {
        console.error("Error creating admin:", err);
    }
    finally {
        await prisma.$disconnect();
    }
}
seedAdmin();
