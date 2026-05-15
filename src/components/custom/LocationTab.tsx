import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuArrow,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { useState } from "react"

function LocationTab() {
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} modal>
            <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="relative ml-3"
            >
                <div className='flex items-end gap-0.5 justify-between text-nav-color hover:outline-solid! hover:outline-offset-3! hover:outline-white! hover:outline-1'>
                    <a
                        href=""
                        className="flex gap-0.5"
                        aria-label="Choose a language for shopping in Amazon United States. The current selection is English (EN)."
                    >
                        <img
                            src="images/us_flag.png"
                            className="w-6 h-auto"
                            alt="United States"
                        />

                        <span>EN</span>
                    </a>

                    <DropdownMenuTrigger asChild>
                        <button className='bg-transparent text-white cursor-pointer pr-0.5'>
                            <ChevronDown strokeWidth={3} size={18} />
                        </button>
                    </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent
                    className="w-56 rounded-none bg-popover text-popover-foreground border-border"
                    align="start"
                >
                    <DropdownMenuArrow className="fill-popover" />

                    <DropdownMenuLabel className="text-foreground">
                        My Account
                    </DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            Profile
                            <DropdownMenuShortcut>
                                ⇧⌘P
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            Billing
                            <DropdownMenuShortcut>
                                ⌘B
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            Settings
                            <DropdownMenuShortcut>
                                ⌘S
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            Keyboard shortcuts
                            <DropdownMenuShortcut>
                                ⌘K
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-border" />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            Team
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="focus:bg-muted focus:text-foreground">
                                Invite users
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                                <DropdownMenuSubContent className="bg-popover text-popover-foreground border-border">
                                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                                        Email
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                                        Message
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="bg-border" />

                                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                                        More...
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                            New Team

                            <DropdownMenuShortcut>
                                ⌘+T
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-border" />

                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                        GitHub
                    </DropdownMenuItem>

                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                        Support
                    </DropdownMenuItem>

                    <DropdownMenuItem disabled>
                        API
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-border" />

                    <DropdownMenuItem className="focus:bg-muted focus:text-foreground">
                        Log out

                        <DropdownMenuShortcut>
                            ⇧⌘Q
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    )
}

export default LocationTab