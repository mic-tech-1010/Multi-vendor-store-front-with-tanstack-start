import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

function HamburgerMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    className="cursor-pointer p-0 max-tablet:px-0! gap-0.5 bg-transparent text-white hover:bg-transparent"
                >
                    <Menu size={28} />
                    <span className="max-tablet:hidden">All</span>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-[90vw] bg-background text-foreground border-border"
            >
                <SheetHeader>
                    <SheetTitle className="text-foreground">
                        Edit profile
                    </SheetTitle>

                    <SheetDescription className="text-muted-foreground">
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label
                            htmlFor="sheet-demo-name"
                            className="text-foreground"
                        >
                            Name
                        </Label>

                        <Input
                            id="sheet-demo-name"
                            defaultValue="Pedro Duarte"
                            className="bg-background text-foreground border-input"
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label
                            htmlFor="sheet-demo-username"
                            className="text-foreground"
                        >
                            Username
                        </Label>

                        <Input
                            id="sheet-demo-username"
                            defaultValue="@peduarte"
                            className="bg-background text-foreground border-input"
                        />
                    </div>
                </div>

                <SheetFooter>
                    <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Save changes
                    </Button>

                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            className="border-border text-foreground hover:bg-muted"
                        >
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default HamburgerMenu