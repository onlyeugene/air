import bcrypt from "bcryptjs";
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password,12);

  const existingUser = await prisma.user.findUnique({
    where: {
        email
    }
  })

  if(existingUser) {
    return NextResponse.json('User already exists', {status: 401})
  }
  const user = await prisma.user.create({
    data: {
        name,
        email,
        hashedPassword
    }
  })

  console.log(user);
  return NextResponse.json(user, {status:201})
  
}
