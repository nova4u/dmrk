import * as React from "react";
import clsx from "clsx";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "outline";
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 font-medium hover:brightness-125 transition ease-out text-emerald-50 hover:shadow-none rounded-md",
        {
          outline: variant === "outline",
          "bg-emerald-600  font-medium text-emerald-50 transition ease-out duration-300 hover:brightness-110":
            variant === "primary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
