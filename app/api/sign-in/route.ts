import { NextRequest, NextResponse } from "next/server";
import generateToken from "@/lib/generatetoken";
import cryptr from "@/lib/cryptr";
import prisma from "@/lib/prisma";
export async function POST(req:NextRequest){
    const {email, password} = await req.json();
    try {
        await prisma.$connect();
        const _user = await prisma.user.findFirst({
            where:{
                email:email
            }
        });
        if(!_user)
            return new Response('User not found', {
                status:404
        })
        const decryptedPassword = cryptr.decrypt(_user.password);
        if(password !== decryptedPassword)
        return new Response('Incorrect password', {
            status:400
        });
        const accessToken = await generateToken(_user);
        return NextResponse.json({..._user, accessToken});
    } catch (error) {
        return new Response("Server Error", {
            status:500
        })
    }
};