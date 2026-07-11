import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardArrow,
} from "@/components/ui/hover-card";
import { ChevronDown } from "lucide-react";

function LocationTab() {
  return (
    <HoverCard openDelay={150} closeDelay={150}>
      <HoverCardTrigger asChild>
        <div className="relative ml-3 cursor-pointer">
          <div className="flex items-end gap-0.5 justify-between text-nav-color hover:outline-solid! hover:outline-offset-3! hover:outline-white! hover:outline-1">
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

            <button
              type="button"
              className="bg-transparent text-white cursor-pointer pr-0.5"
              aria-label="Expand language menu"
            >
              <ChevronDown strokeWidth={3} size={18} />
            </button>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="start"
        sideOffset={2}
        className="w-56 rounded-none border-border bg-popover p-1 text-popover-foreground"
      >
        <HoverCardArrow className="fill-popover" />

        <div className="px-2 py-1.5 text-sm font-medium">
          My Account
        </div>

        <div className="my-1 h-px bg-border" />

        {[
          ["Profile", "⇧⌘P"],
          ["Billing", "⌘B"],
          ["Settings", "⌘S"],
          ["Keyboard shortcuts", "⌘K"],
        ].map(([label, shortcut]) => (
          <button
            key={label}
            className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            <span>{label}</span>

            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
              {shortcut}
            </span>
          </button>
        ))}

        <div className="my-1 h-px bg-border" />

        <button className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted">
          Team
        </button>

        <button className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted">
          Invite users
        </button>

        <button className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted">
          New Team

          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            ⌘T
          </span>
        </button>

        <div className="my-1 h-px bg-border" />

        {["GitHub", "Support", "API"].map((item) => (
          <button
            key={item}
            className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
          >
            {item}
          </button>
        ))}

        <div className="my-1 h-px bg-border" />

        <button className="flex w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted">
          Log out

          <span className="ml-auto text-xs tracking-widest text-muted-foreground">
            ⇧⌘Q
          </span>
        </button>
      </HoverCardContent>
    </HoverCard>
  );
}

export default LocationTab;