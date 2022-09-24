import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

interface LogotypeProps extends HTMLAttributes<HTMLDivElement> {
  textClassName?: string;
}

const Logotype: FC<React.PropsWithChildren<LogotypeProps>> = ({
  children,
  textClassName,
  className,
  ...rest
}) => {
  return (
    <div className={clsx("flex items-center", className)} {...rest}>
      {children}
      <span
        className={clsx(
          "font-mono ml-6 text-lg tracking-tight",
          {
            "text-emerald-50": !textClassName,
          },
          textClassName
        )}
      >
        Denis Marushchak
      </span>
    </div>
  );
};

export default Logotype;
