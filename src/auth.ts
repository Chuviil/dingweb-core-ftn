import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {authUser} from "@/controllers/auth.controller";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            authorize: async (credentials) => {
                let user = null

                try {
                    user = await authUser(credentials.email as string, credentials.password as string)

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
