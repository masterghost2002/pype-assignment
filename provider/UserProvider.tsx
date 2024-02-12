"use client"
import { ReactNode, createContext, useContext, useState, useEffect } from "react"
import { UserType } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
type ContextType = {
    user: UserType | null;
    setUser: (data: UserType | null) => void;
    setFavourite: (value: string) => void;
    removeFavourite: (value: string) => void;
}
type props = {
    children: ReactNode
}
const userContextDefaultValues = {
    user: null,
    setUser: (data: UserType | null) => { },
    setFavourite: (value: string) => { },
    removeFavourite: (value: string) => { }
}
const UserContext = createContext<ContextType>(userContextDefaultValues);
export function useUser() {
    return useContext(UserContext);
}
export function UserProvider({ children }: props) {

    const [user, setUserState] = useState<UserType | null>(null);
    const setUser = (data: UserType | null) => {
        setUserState(data);
        if (data === null)
            localStorage.clear();
        else localStorage.setItem('user', JSON.stringify(data));
    }
    const setFavouriteLocally = (value: string) => {
        const newUser = user;
        if (!newUser) return;
        const favouritePlaces = newUser?.favouritePlaces || [];
        favouritePlaces.push(value);
        setUser({ ...newUser, favouritePlaces });
    }
    const removeFavouriteLocally = (value: string) => {
        const newUser = user;
        if (!newUser) return;
        const favouritePlaces = newUser?.favouritePlaces?.filter(v => v !== value);
        setUser({ ...newUser, favouritePlaces });
    }

    const setFavourite = (value:string)=>{
        setFavouriteLocally(value);
        handleSetFavouriteInDB(value);
    }

    const removeFavourite = (value:string)=>{
        removeFavouriteLocally(value);
        handleRemoveFavouriteFromDB(value);
    }
    const handleSetFavouriteInDB = async (value:string)=>{
        if(!user) return;
        const accessToken = user.accessToken;
        try {
            await axios.post('/api/favourites/add', {value:value}, {
                headers:{
                    'Authorization':`Bearer ${accessToken}`
                }
            });
        } catch (error) {
            toast.error('Failed to update favourites in db');
            removeFavouriteLocally(value);
        }
    }
    const handleRemoveFavouriteFromDB = async (value:string)=>{
        if(!user) return;
        const accessToken = user.accessToken;
        try {
            await axios.put('/api/favourites/remove', {value:value}, {
                headers:{
                    'Authorization':`Bearer ${accessToken}`
                }
            });
        } catch (error) {
            toast.error('Failed to remove favourite in db');
            setFavouriteLocally(value)
        }
    }
    const value = {
        user,
        setFavourite,
        removeFavourite,
        setUser
    }
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) return;
        setUser(JSON.parse(user));
    }, []);
    return (
        <UserContext.Provider value={value}>
            <Toaster />
            {children}
        </UserContext.Provider>
    )
}