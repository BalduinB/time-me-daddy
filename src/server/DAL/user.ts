import { db } from "../db";

export async function getUser(id: string) {
    return await db.query.user.findFirst({
        where: ({ userId }, { eq }) => eq(userId, id),
    });
}
