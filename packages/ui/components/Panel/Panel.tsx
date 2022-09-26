import clsx from "clsx";
import React, { FC } from "react";

interface PanelProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Panel: FC<React.PropsWithChildren<PanelProps>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "  left-1/2 -translate-x-1/2 bottom-10 flex items-center ",
        className
      )}
      style={{
        width: "calc(100% - 32px)",
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
