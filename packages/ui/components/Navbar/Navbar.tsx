import clsx from "clsx"
import React, { FC } from "react"
import Chevron from "../Icons/Chevron"
import Github from "../Icons/Github"
import Linkedin from "../Icons/Linkedin"
import Logotype from "../Logotype/Logotype"

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Navbar: FC<NavbarProps> = ({ className, ...rest }) => {
  const iconClasses = "text-neutral-200 hover:text-primary w-5 h-5 transition ease-out"
  return (
    <div className={clsx("flex w-full items-center justify-between ", className)} {...rest}>
      <Logotype />
      <div className="flex flex-wrap gap-4 justify-end">
        <div className="flex space-x-6 items-center">
          <a
            href="https://github.com/nova4u/dmrk"
            target="_blank"
            rel="noreferrer nofollow noindex"
          >
            <span className="sr-only">Check out this project on github</span>
            <Github className={iconClasses} />
          </a>
          <a
            href="https://github.com/nova4u/dmrk"
            target="_blank"
            rel="noreferrer nofollow noindex"
          >
            <span className="sr-only">Go to author&apos;s linkedin profile page</span>
            <Linkedin className={iconClasses} />
          </a>
        </div>

        <a
          className="hidden sm:flex transition text-neutral-200 font-bold hover:text-primary  items-center group ml-3 lg:ml-10  leading-none self-end -mb-0.5"
          href="mailto:denismar322@gmail.com"
        >
          Contact Me
          <Chevron
            className="rotate-90 w-5 h-5 translate-y-px -translate-x-2 opacity-0 transition duration-150 text-primary group-hover:opacity-100 group-hover:translate-x-1 ease-out"
            strokeWidth={2}
          />
        </a>
      </div>
    </div>
  )
}

export default Navbar
