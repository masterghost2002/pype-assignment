"use client"
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import Switcher from "./switcher";
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/provider/UserProvider";
import { Button } from "./ui/button";
type props = {
    location: string;
    setLocation: (value: string) => void;
    isCelcius: boolean;
    setIsCelcius: (value: boolean) => void;
}
export default function ServerSearch({
    location,
    setLocation,
    isCelcius,
    setIsCelcius
}: props) {
    const [open, setOpen] = useState<boolean>(false);
    const [currentSearch, setCurrentSearch] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);

    const { user, setFavourite, removeFavourite } = useUser();

    const favouritePlaces = user?.favouritePlaces || [];

    const handleSearch = (value: string) => {
        setCurrentSearch(value);
    };

    const onSelect = (item: string) => {
        setLocation(item);
        setOpen(false);
    }


    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node))
            setOpen(false);
    };

    const addToFavourite = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setFavourite(currentSearch);

    }
    const removeFromFavourite = async (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        removeFavourite(currentSearch);

    }

    useEffect(() => {
        // Attach event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative flex gap-2 items-center justify-between"
            ref={containerRef}
        >
            <Input
                value={currentSearch}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search"
                onFocus={() => setOpen(true)}
            />
            {open &&
                <div
                    className="bg-[#454545] absolute top-14 left-0 w-full p-4 rounded z-10"
                >
                    <ul>
                        <li
                            className="hover:bg-[#333] p-2 cursor-pointer flex justify-between items-center"
                            onClick={() => onSelect(currentSearch)}
                        >
                            <span>
                                {currentSearch}
                            </span>
                            {user && currentSearch.length > 0 && <Button onClick={addToFavourite} size={"sm"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            </Button>}
                        </li>
                    </ul>
                    <Separator />
                    {user && <span
                        className="text-gray-300 text-sm"
                    >
                        Favourite Places
                    </span>}
                    {
                        !user && <span
                            className="text-gray-300 text-sm"
                        >
                            Login to save places a favourite places
                        </span>
                    }
                    <ul>
                        {favouritePlaces.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-[#333] p-2 cursor-pointer flex justify-between items-center"
                                onClick={() => onSelect(item)}
                            >
                                <span>
                                    {item}
                                </span>
                                <Button onClick={removeFromFavourite} size={"sm"}>
                                    ⭐
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <Switcher
                isCelcius={isCelcius}
                setIsCelcius={setIsCelcius}
            />
        </div>
    )
}