import clsx from "clsx";
import React, { FC } from "react";

interface ChevronProps extends React.SVGProps<React.ReactSVGElement> {}

const Chevron: FC<ChevronProps> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      {...rest}
      className={clsx(
        {
          "w-6 h-6": !className,
        },
        className
      )}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default Chevron;
