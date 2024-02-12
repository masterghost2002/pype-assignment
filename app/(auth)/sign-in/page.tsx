"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import SignInForm from "@/components/forms/sign-in.form";
import { SignInFormType } from "@/components/forms/schemas/form.types";
import { useUser } from "@/provider/UserProvider";
import Link from "next/link";
// component and its state
export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false);

    const {setUser}  = useUser();
    //navigation
    const router = useRouter();

    const handleSignIn = async (data:SignInFormType)=>{
        setIsLoading(true);
        try {
            const response = await axios.post('/api/sign-in', {email:data.email, password:data.password});
            const user = response.data;
            setUser(user);
            toast.success("Signed in")
            router.push('/');
        } catch (error:any) {
            toast.error(error.response.data);
        }
        setIsLoading(false);
    }
    return (
        <div
            className="
                flex flex-col 
                justify-center 
                items-start 
                w-full 
                md:w-1/4 
                gap-10 
                text-start
                "
        >
            <h1
                className="text-[48px] font-bold"
            >
                Sign In
            </h1>
            <SignInForm 
                onSubmit = {handleSignIn}
                isLoading={isLoading}
            />
            <Link href="/sign-up" className="text-blue-400">Don&apos;t have an account?Sign Up</Link>
        </div>
    )
}