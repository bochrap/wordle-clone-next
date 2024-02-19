'use server';
import { auth, currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";



export async function getUserId (){
    const { userId } = auth();
    const user = await currentUser();

    const users = await sql`SELECT users.id FROM users WHERE clerk_user_id = ${userId}`;
    return users.rows[0].id;
}