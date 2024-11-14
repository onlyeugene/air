import { Listing, Reservation, User } from "@prisma/client";

export type Safelistiings = Omit<
Listing,
'createdAt'> & {
    createdAt: string
}

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null
}

// export type safeFavorites = Omit<
// Favorite,
// "createdAt"> & {

// }
export type safeReservations = Omit<
Reservation,
'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: Safelistiings
}