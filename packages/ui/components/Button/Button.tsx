import * as React from "react";
import clsx from "clsx";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        "bg-indigo-600 py-1.5 px-4 rounded-lg font-medium text-indigo-50 transition ease-out duration-300 hover:brightness-110",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
