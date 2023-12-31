"use client";

import { useEffect, useState } from "react";

// packages
import { LogIn, ShoppingBag } from "lucide-react";

// components
import useCart from "@/hooks/use-cart";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Button from "./ui/button";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter();
    const { userId } = useAuth();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cart = useCart();

    if (!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button
                onClick={() => router.push("/cart")}
                className="flex items-center rounded-full bg-black px-4 py-2"
            >
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>

            {userId ? (
                <UserButton afterSignOutUrl="/" />
            ) : (
                <Button
                    onClick={() => router.push("/sign-in")}
                    className="flex items-center rounded-full bg-black px-4 py-2"
                >
                    <LogIn size={20} color="white" />
                    <span className="ml-2 text-sm font-medium text-white">
                        Log In
                    </span>
                </Button>
            )}
        </div>
    );
};

export default NavbarActions;
