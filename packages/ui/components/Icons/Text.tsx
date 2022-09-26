import clsx from "clsx";
import React, { FC } from "react";

interface TextProps extends React.SVGProps<SVGSVGElement> {}

const Text: FC<TextProps> = ({ className, ...rest }) => {
  return (
    <svg
      className={clsx(
        {
          "w-6 h-6": !className,
        },
        className
      )}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5ZM1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12Z"
        fill="#ECFDF5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 8A.75.75 0 0 1 8 7.25h8a.75.75 0 0 1 0 1.5H8A.75.75 0 0 1 7.25 8Z"
        fill="#ECFDF5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75Z"
        fill="#ECFDF5"
      />
    </svg>
  );
};

export default Text;
