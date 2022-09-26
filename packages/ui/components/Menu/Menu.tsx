import React, { FC } from "react";
import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import Chevron from "../Icons/Chevron";

const optionsIsStringArray = (
  options: MenuProps["options"]
): options is string[] => {
  if (typeof options[0] === "string") return true;
  return false;
};

type CustomElProps = {
  key: number;
};

interface MenuProps {
  closeOnClick?: boolean;
  onSelect: (index: number) => void;
  active?: number;
  openOnMouseOver?: boolean;
  options:
    | string[]
    | { el: (data: CustomElProps) => JSX.Element; action?: () => void }[];
  label?: (props: { onMouseOver?: () => void }) => JSX.Element;
  showLabel?: boolean;
  className?: string;
  icon?: React.ReactNode;
  containerClasses?: string;
  size?: "sm" | "md" | "lg" | "auto";
}

const Menu: FC<MenuProps> = ({
  onSelect,
  closeOnClick = false,
  className,
  options,
  showLabel = false,
  active,
  containerClasses,
  openOnMouseOver = false,
  label,
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
    <div className={containerClasses}>
      <Popover.Root open={open} onOpenChange={(v) => setOpen(v)}>
        <Popover.Trigger
          className={clsx(
            "border border-white/10 rounded-lg  leading-none py-1.5  px-2 flex items-center justify-between hocus:outline-none hocus:ring-1 hocus:ring-emerald-600 transition text-sm",
            className,
            {
              "w-28": size === "sm",
              "w-40": size === "md",
              "w-52": size === "lg",
              "w-auto": size === "auto",
            }
          )}
          asChild={Boolean(label)}
        >
          {label ? (
            label({
              onMouseOver: () => {
                if (openOnMouseOver) setOpen(true);
              },
            })
          ) : (
            <>
              <div
                className="flex items-center truncate  h-5"
                onMouseOver={() => openOnMouseOver && setOpen(true)}
              >
                {icon ? icon : ""}
                <span className="text-left truncate">
                  {showLabel &&
                  active !== undefined &&
                  optionsIsStringArray(options) ? (
                    options[active]
                  ) : (
                    <span className="h-4 block"></span>
                  )}
                </span>
              </div>
              <Chevron className="ml-2 w-4 h-4 opacity-40 flex-shrink-0" />
            </>
          )}
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            className="bg-neutral-800 border border-white/10 rounded-lg px-3 py-3  shadow-xl text-neutral-200   max-h-80 overflow-y-scroll w-max max-w-sm space-y-1 "
            onMouseLeave={() => openOnMouseOver && setOpen(false)}
            side="top"
            sideOffset={54}
            align="center"
          >
            {options.map((item, i) => {
              if (typeof item === "string") {
                return (
                  <button
                    className={clsx(
                      "block text-left text-sm rounded-md font-semibold hocus:outline-none transition duration-75 px-3 py-1",
                      active !== undefined && {
                        "text-emerald-400 hocus:ring-emerald-600 hocus:ring-1":
                          active === i,
                        "text-neutral-500 hocus:text-white ": active !== i,
                      }
                    )}
                    key={i}
                    onClick={() => handleClick(i)}
                  >
                    {item}
                  </button>
                );
              } else {
                return item.el({
                  key: i,
                });
              }
            })}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default Menu;
