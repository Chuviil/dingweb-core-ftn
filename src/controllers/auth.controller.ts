import {User} from "@/models/user";

export async function authUser(email: string, password: string): Promise<User> {
    const user = await fetch(`${process.env.BACKEND_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
        cache: "no-store"
    });
    if (!user.ok) throw new Error("Invalid credentials");
    return await user.json() as User;
}
