import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import Chevron from "../Icons/Chevron";

interface MenuProps {
  closeOnClick?: boolean;
  onSelect: (index: number) => void;
  active: number;
  options: string[];
  showLabel?: boolean;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "auto";
}

const Menu: FC<MenuProps> = ({
  onSelect,
  closeOnClick = false,
  options,
  showLabel = false,
  active,
  icon,
  size = "auto",
}) => {
  const [open, setOpen] = React.useState(false);

  const closeMenu = () => setOpen(false);

  const handleClick = (i: number) => {
    if (closeOnClick) closeMenu();
    if (onSelect) onSelect(i);
  };

  return (
    <div className="relative">
      <Popover.Root open={open} onOpenChange={(v) => setOpen(v)}>
        <Popover.Trigger
          className={clsx(
            "border border-white/10 rounded-lg h-full py-2 px-3 flex items-center justify-between hocus:outline-none hocus:ring-1 hocus:ring-emerald-600 transition",
            {
              "w-28": size === "sm",
              "w-40": size === "md",
              "w-52": size === "lg",
              "w-auto": size === "auto",
            }
          )}
        >
          <div className="flex items-center truncate">
            {icon ? icon : ""}
            <span className="text-left truncate">
              {showLabel ? (
                options[active]
              ) : (
                <span className="h-6 block"></span>
              )}
            </span>
          </div>
          <Chevron className="ml-2 w-4 h-4 opacity-40 flex-shrink-0" />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Content className="bg-neutral-800 border border-white/10 rounded-lg px-3 py-3  shadow-xl absolute  -top-16 lg:left-1/2 text-neutral-200  lg:-translate-x-1/2 -translate-y-full max-h-80 overflow-y-scroll w-max max-w-sm space-y-1">
          {options.map((item, i) => {
            return (
              <button
                className={clsx(
                  "block text-left text-sm rounded-md font-semibold hocus:outline-none hocus:ring-1 hocus:ring-white hocus:text-white transition duration-75 px-3 py-1",
                  {
                    "text-emerald-400": active === i,
                    "text-neutral-500": active !== i,
                  }
                )}
                key={i}
                onClick={() => handleClick(i)}
              >
                {item}
              </button>
            );
          })}
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default Menu;
