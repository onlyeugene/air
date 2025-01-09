
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrenUser() {
    try {
        const session = await getSession()
        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if(!currentUser){
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch(error: unknown){
        return  error
    }
}