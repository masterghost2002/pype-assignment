import { NextRequest,NextResponse  } from "next/server";
import validateToken from "@/lib/validateToken";
import prisma from "@/lib/prisma";
export async function POST(req: NextRequest) {
    const { value } = await req.json();

    const accessToken = await req.headers.get('Authorization');
    if (!accessToken)
        return new Response('User not found', {
            status: 404
        })
    try {
        await prisma.$connect();
        const userFromToken = await validateToken(accessToken);
        if (!userFromToken)
            return new Response('User not found', {
                status: 404
            })
        const _user = await prisma.user.findFirst({
            where: {
                email: userFromToken.email
            }
        });
        if (!_user)
            return new Response('User not found', {
                status: 404
            })
        const favouritePlaces = _user.favouritePlaces || [];
        favouritePlaces.push(value);
        await prisma.user.update({
            where:{
                email:userFromToken.email
            },
            data:{
                favouritePlaces:favouritePlaces
            }
        });
        return NextResponse.json('Added to favourites');
    } catch (error) {
        return new Response("Server Error", {
            status: 500
        })
    }
};