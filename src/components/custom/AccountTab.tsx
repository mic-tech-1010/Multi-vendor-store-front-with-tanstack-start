import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuArrow,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ChevronDown, UserCircle2 } from 'lucide-react'
import { useState } from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Link } from '@tanstack/react-router'

function AccountTab() {
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal>

            <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="relative ml-3"
            >

                <div className='flex gap-0.5 justify-between items-end hover:outline-solid! hover:outline-offset-3! hover:outline-ring! hover:outline-1 mr-0.5'>

                    <Link
                        to={"/"}
                        className="text-left leading-[1.1] text-link"
                    >
                        <span className="text-[13px] text-link/90">
                            Hello,
                            {' Sign in'}
                        </span>

                        <span className="block text-base font-medium text-link">
                            Account &amp; Lists
                        </span>
                    </Link>

                    <DropdownMenuTrigger asChild>
                        <button
                            className='bg-transparent text-white cursor-pointer '
                            aria-label="Expand Account and Lists menu"
                        >
                            <ChevronDown strokeWidth={3} size={18} />
                        </button>
                    </DropdownMenuTrigger>

                </div>

                <DropdownMenuContent
                    className="w-120 rounded-none px-4 border-border bg-popover text-popover-foreground"
                    align="center"
                >

                    <DropdownMenuArrow className="fill-popover" />

                    {1 + 1 === 2
                        ? (
                            <Card className="py-0 px-3 bg-muted border-border shadow-none">

                                <CardHeader>
                                    <CardTitle className="sr-only">
                                        Your Account
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex justify-between items-center px-0 py-1">

                                    <div className="flex gap-3 items-center">

                                        <UserCircle2
                                            size={35}
                                            className="bg-muted-foreground rounded-full text-background"
                                        />

                                        <p className="leading-3">
                                            <span className="block text-[0.9375rem] font-semibold text-foreground">
                                                {'name'}
                                            </span>

                                            <span className="text-sm text-muted-foreground">
                                                {'email'}
                                            </span>
                                        </p>

                                    </div>

                                    <div className="flex items-center gap-2 text-sm">

                                        <Link
                                            to={"/"}
                                            className="hover:underline text-primary"
                                        >
                                            Switch Accounts
                                        </Link>

                                        <Link
                                            to={"/"}
                                            className="hover:underline text-primary cursor-pointer"
                                        >
                                            Sign Out
                                        </Link>

                                    </div>

                                </CardContent>

                            </Card>
                        )
                        : (
                            <>
                                <div className="grid place-items-center my-3 gap-2">

                                    <Button
                                        asChild
                                        className="bg-primary text-primary-foreground text-sm px-16 py-1 hover:bg-primary/90"
                                    >
                                        <Link to={"/"} className="hover:underline">
                                            Sign In
                                        </Link>
                                    </Button>

                                    <div className="text-center text-xs text-muted-foreground">
                                        New customer?{' '}

                                        <Link
                                            to={"/"}
                                            tabIndex={5}
                                            className="text-primary hover:underline"
                                        >
                                            Start here
                                        </Link>
                                    </div>

                                </div>
                            </>
                        )
                    }

                    <Separator className="bg-border" />

                    <div className="grid grid-cols-2 pt-3">

                        <DropdownMenuGroup className="flex-1">

                            <DropdownMenuLabel className="font-bold text-lg text-foreground">
                                Your List
                            </DropdownMenuLabel>

                            {[
                                {
                                    label: "Create a List",
                                    href: "#"
                                },
                                {
                                    label: "Find a List or Registry",
                                    href: "#"
                                },
                            ].map(({ label }) => (
                                <DropdownMenuItem
                                    key={label}
                                    className="text-sm leading-3 text-muted-foreground focus:text-foreground"
                                    asChild
                                >
                                    <Link to={"/"} className="cursor-pointer">
                                        {label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}

                        </DropdownMenuGroup>

                        <div className="flex items-center">

                            <Separator
                                orientation="vertical"
                                className="bg-border"
                            />

                            <DropdownMenuGroup>

                                <DropdownMenuLabel className="font-bold text-lg text-foreground">
                                    Your Account
                                </DropdownMenuLabel>

                                {[
                                    {
                                        label: "Account",
                                        href: "#"
                                    },
                                    {
                                        label: "Order",
                                        href: "#"
                                    },
                                    {
                                        label: "Recommendations",
                                        href: "#"
                                    },
                                    {
                                        label: "Browsing history",
                                        href: "#"
                                    },
                                    {
                                        label: "Your Shopping Preferences",
                                        href: "#"
                                    },
                                    {
                                        label: "Watch List",
                                        href: "#"
                                    },
                                ].map(({ label }) => (
                                    <DropdownMenuItem
                                        key={label}
                                        className="text-sm leading-3 text-muted-foreground focus:text-foreground"
                                        asChild
                                    >
                                        <Link to={"/"} className="cursor-pointer">
                                            {label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}

                            </DropdownMenuGroup>

                        </div>

                    </div>

                </DropdownMenuContent>

            </div>

        </DropdownMenu>
    )
}

export default AccountTab