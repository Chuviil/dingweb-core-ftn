import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {authUser} from "@/controllers/auth.controller";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },
            authorize: async (credentials) => {
                let user = null

                try {
                    user = await authUser(credentials.username as string, credentials.password as string)

                    return user
                } catch (e) {
                    console.log(e)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        authorized: async ({auth}) => {
            return !!auth
        },
    },
});
