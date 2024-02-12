"use client";
import {useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SignUpForm from "@/components/forms/sign-up.form";
import { SignUpFormType } from "@/components/forms/schemas/form.types";
import Link from "next/link";
import axios from "axios";
export default function ServerSetupPage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async (data: SignUpFormType): Promise<void> => {
        if (data.password !== data.confirmPassword) {
            toast.error('Password and confirm password must be same');
            return;
        }
        setIsLoading(true);
        try {
            await axios.post('/api/sign-up', { email:data.email, fullname:data.fullname, password:data.password});
            setIsLoading(false);
            setTimeout(()=>{
                router.push('/');
            }, 1000)
        } catch (error: any) {
            setIsLoading(false);
            throw Error(error.response.data);
        }
    }
    const createUser = async (data:SignUpFormType):Promise<void>=>{
        toast.promise(handleSignUp(data), {
            loading:'Creating User',
            success:"User is created",
            error:'Failed to add user'
        })
    }
    return (
        <div
            className="
                flex 
                flex-col 
                gap-10
                w-full 
                md:w-1/3 
                "
        >
            <h1
                className="text-[48px] font-[700] "
            >
                Sign up to Weather
            </h1>
            <p
                className="
                    font-[500] 
                    text-light-normal-text
                "
            >
                Signup to save you favourite places
            </p>
            <SignUpForm
                onSubmit={createUser}
                isLoading={isLoading}
            />
            <Link href={'/sign-in'} className="text-blue-100" >Already have an account?</Link>
        </div>
    )
}