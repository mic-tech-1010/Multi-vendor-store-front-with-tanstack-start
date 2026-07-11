import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    HoverCardArrow,
} from "@/components/ui/hover-card";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";
import { toast } from "sonner";
import type { UserSession } from "#/server/getCurrentSession";

function AccountTab({ session }: { session: UserSession }) {
    const accountRoute = session?.user ? "/account" : "/login";

    return (
        <HoverCard openDelay={150} closeDelay={150}>
            <HoverCardTrigger asChild>
                <div className="relative ml-3 cursor-pointer">
                    <div className="flex gap-0.5 justify-between items-end hover:outline-solid! hover:outline-offset-3! hover:outline-ring! hover:outline-1 mr-0.5">
                        <Link
                            to={accountRoute}
                            className="text-left leading-[1.1] text-link"
                        >
                            <span className="text-[13px] text-link/90">
                                Hello,
                                {session?.user ? ` ${session.user.name}` : " Sign in"}
                            </span>

                            <span className="block text-base font-medium text-link">
                                Account &amp; Lists
                            </span>
                        </Link>

                        <button
                            type="button"
                            className="bg-transparent text-white cursor-pointer"
                            aria-label="Expand Account and Lists menu"
                        >
                            <ChevronDown strokeWidth={3} size={18} />
                        </button>
                    </div>
                </div>
            </HoverCardTrigger>

            <HoverCardContent
                side="bottom"
                align="center"
                sideOffset={2}
                className="relative w-[480px] rounded-none border-border bg-popover p-4 text-popover-foreground"
            >
                {/* Arrow */}
                <HoverCardArrow />

                {session?.user ? (
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
                                    <span className="block text-[0.9375rem] font-semibold">
                                        {session.user.name}
                                    </span>

                                    <span className="text-sm">
                                        {session.user.email}
                                    </span>
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Link
                                    to="/login"
                                    className="hover:underline text-foreground!"
                                >
                                    Switch Accounts
                                </Link>

                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={async () => {
                                        await authClient.signOut();
                                        toast.success("Signed out successfully");
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid place-items-center my-3 gap-2">
                        <Button
                            asChild
                            className="bg-primary text-sm px-16 py-1 hover:bg-primary/90"
                        >
                            <Link to="/login">
                                Sign In
                            </Link>
                        </Button>

                        <div className="text-center text-xs">
                            New customer?{" "}
                            <Link
                                to="/signup"
                                className="hover:underline"
                            >
                                Start here
                            </Link>
                        </div>
                    </div>
                )}

                <Separator className="bg-border my-4" />

                <div className="grid grid-cols-2">
                    <div>
                        <h3 className="px-2 pb-2 text-lg font-bold">
                            Your Lists
                        </h3>

                        {[
                            "Create a List",
                            "Find a List or Registry",
                        ].map((label) => (
                            <Link
                                key={label}
                                to="/"
                                className="block rounded-sm px-2 py-1.5 text-sm text-foreground! hover:bg-accent hover:text-accent-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex">
                        <Separator
                            orientation="vertical"
                            className="mr-4"
                        />

                        <div className="flex-1">
                            <h3 className="px-2 pb-2 text-lg font-bold">
                                Your Account
                            </h3>

                            {[
                                "Account",
                                "Orders",
                                "Recommendations",
                                "Browsing History",
                                "Your Shopping Preferences",
                                "Watch List",
                            ].map((label) => (
                                <Link
                                    key={label}
                                    to="/"
                                    className="block rounded-sm px-2 py-1.5 text-sm text-foreground! hover:bg-accent hover:text-accent-foreground"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

export default AccountTab;