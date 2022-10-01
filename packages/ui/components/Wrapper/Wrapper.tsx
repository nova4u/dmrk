import clsx from "clsx"
import React, { FC, HTMLAttributes } from "react"

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "default" | "top" | "bottom" | "none"
}

const Wrapper: FC<React.PropsWithChildren<WrapperProps>> = ({
  children,
  className,
  padding = "default",
  ...rest
}) => {
  return (
    <section
      className={clsx({
        "py-24 pd:py-32 lg:py-36": padding === "default",
        "pt-24 pd:pt-32 lg:pt-36": padding === "top",
        "pb-24 pd:pb-32 lg:pb-36": padding === "bottom",
      })}
    >
      <div className={clsx("max-w-screen-xl px-6 mx-auto", className)} {...rest}>
        {children}
      </div>
    </section>
  )
}

export default Wrapper
