"use client"
import { useUser } from "@/provider/UserProvider";
import { Button } from "./ui/button";
import Link from "next/link";
const UserAuthHandler = ()=>{
    const {user, setUser} = useUser();
    const handleSignOut = ()=>{
        setUser(null);
    }
    if(user)
        return <Button onClick={handleSignOut}>Sign Out</Button>
    return <Link href="/sign-in" className="p-2 bg-white rounded text-black">Sign In</Link>
}
export default UserAuthHandler;