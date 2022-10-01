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
      <div className="w-auto relative flex-shrink-0">
        <Image
          sizes="10vw"
          className="object-cover w-10 h-10   rounded-full border border-emerald-500"
          src={Logo}
          alt="Denis Marushchak photo"
          width={40}
          height={40}
        />
        <span className="w-3 h-3 bg-emerald-500 absolute top-0 right-0 rounded-full border border-neutral-900"></span>
      </div>
      <span
        className={clsx(
          " ml-3 md:ml-6 text-md md:text-lg tracking-tight font-bold ",
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
