import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(request) {
    const data = await request.json();

     const isUserOnBoarded = await prisma.user.findFirst({
            where: {
              email: data.email,
            },
            select: {
              username: true,
            }
          });
          if(!(isUserOnBoarded.username)){
            return NextResponse.json({onBoarded: false})
          }

        return NextResponse.json({onBoarded: true})
    
}