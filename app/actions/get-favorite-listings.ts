import prisma from '@/app/libs/prismadb'
import getCurrenUser from './get-current-user'


export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrenUser()

        if(!currentUser){
            return [];
        }

        const favorites = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [] )]
                }
            }
        })

        const safeFavorites = favorites.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;
        
    } catch (error: any) {
        throw new Error(error)        
    }
}