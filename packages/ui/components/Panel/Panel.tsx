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
        "bg-neutral-800 max-w-screen-2xl mx-auto rounded-lg border border-white/10 left-1/2 -translate-x-1/2 bottom-5 flex items-center px-6  flex-wrap py-2.5 gap-6",
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
