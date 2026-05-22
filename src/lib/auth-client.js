import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

// 1. Create your configured instance
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", 
    plugins: [
        jwtClient() 
    ]
})

export const { signIn, signUp, useSession, signOut } = authClient;