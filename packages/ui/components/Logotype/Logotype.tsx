import clsx from "clsx";
import Logo from "../../assets/dmrk.jpg";
import React, { FC, HTMLAttributes } from "react";
import Image from "next/future/image";

interface LogotypeProps extends HTMLAttributes<HTMLDivElement> {
  textClassName?: string;
}

const Logotype: FC<LogotypeProps> = ({ textClassName, className, ...rest }) => {
  return (
    <div className={clsx("flex items-center", className)} {...rest}>
      <div className="w-auto relative">
        <Image
          className="object-cover  w-10 h-10 rounded-full border border-emerald-500"
          src={Logo}
          alt="Denis Marushchak photo"
          quality={100}
          width={128}
          height={128}
        />
        <span className="w-3 h-3 bg-emerald-500 absolute top-0 right-0 rounded-full border border-neutral-900"></span>
      </div>
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
