import { NextRequest, NextResponse } from "next/server";
import cryptr from "@/lib/cryptr";
import prisma from "@/lib/prisma";
export async function POST(req:NextRequest){
    const {fullname, email, password:_password} = await req.json();
    try {
        await prisma.$connect();
        const encryptedPassword = cryptr.encrypt(_password);
        const isUserExits = await prisma.user.findFirst({
            where:{
                email:email
            }
        });
        if(isUserExits)
            return new Response('User already exits', {
                status:409
        })
        const _user = await prisma.user.create({
            data:{
                fullname:fullname,
                email:email,
                password:encryptedPassword
            }
        });
        const {password, ...user} = _user;
        return NextResponse.json(user);
    } catch (error) {
        console.log(error)
        return new Response("Server Error", {
            status:500
        })
    }
};