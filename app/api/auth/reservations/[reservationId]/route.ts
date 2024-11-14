import getCurrenUser from "@/app/actions/get-current-user";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
    const currentUser = await getCurrenUser()

    if(!currentUser) {
        return NextResponse.error()
    }
    // return NextResponse.json({ message: "User not authenticated" }, { status: 401 });

    const { reservationId } = await params;

    if(!reservationId || typeof reservationId !== 'string'){
        throw new Error('Invalid ID')
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {userId : currentUser.id},
                {listing: {userId: currentUser.id}}
            ]
        }
    })

    return NextResponse.json(reservation);
}
