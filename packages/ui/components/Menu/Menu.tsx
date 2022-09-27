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
  onSelect?: (index: number) => void;
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
  controller?: {
    open: boolean;
    setOpen: (open: boolean) => void;
  };
  onOpenAutoFocus?: (e: Event) => void;
  onCloseAutoFocus?: (e: Event) => void;
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
  onOpenAutoFocus,
  onCloseAutoFocus,
  controller,
  size = "auto",
}) => {
  const [open, setOpen] = React.useState(false);

  const setIsOpen = (v: boolean) => controller?.setOpen(v) || setOpen(v);

  const isOpen = controller ? controller.open : open;

  const handleClick = (i: number) => {
    if (closeOnClick) setIsOpen(false);
    if (onSelect) onSelect(i);
  };

  return (
    <div className={containerClasses}>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <Popover.Trigger
          className={clsx(
            "border border-white/10 rounded-lg  leading-none  h-9 px-2   flex items-center justify-between hocus:outline-none hocus:ring-1 hocus:ring-emerald-600 transition text-xs md:text-sm",
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
                if (openOnMouseOver) setIsOpen(true);
              },
            })
          ) : (
            <>
              <div
                className="flex items-center truncate  h-5"
                onMouseOver={() => openOnMouseOver && setIsOpen(true)}
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
            className={clsx(
              "bg-neutral-800 border border-white/10 rounded-lg px-3 py-3   shadow-xl text-neutral-200   max-h-80 overflow-y-scroll w-max max-w-sm space-y-1",
              {
                hidden: options.length === 0,
              }
            )}
            onMouseLeave={() => openOnMouseOver && setIsOpen(false)}
            side="top"
            sideOffset={54}
            align="center"
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
          >
            {options.length &&
              options?.map((item, i) => {
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
