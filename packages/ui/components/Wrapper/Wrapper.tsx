import clsx from "clsx"
import React, { HTMLAttributes } from "react"

interface WrapperProps extends HTMLAttributes<HTMLElement> {
  padding?: "default" | "top" | "bottom" | "none"
}

const Wrapper = React.forwardRef<HTMLElement, WrapperProps>(
  ({ children, className, padding = "default", ...rest }, ref) => {
    return (
      <section
        className={clsx({
          "py-24 pd:py-32 lg:py-36": padding === "default",
          "pt-24 pd:pt-32 lg:pt-36": padding === "top",
          "pb-24 pd:pb-32 lg:pb-36": padding === "bottom",
        })}
        ref={ref}
        {...rest}
      >
        <div className={clsx("max-w-screen-xl px-6 mx-auto", className)}>{children}</div>
      </section>
    )
  }
)

Wrapper.displayName = "Wrapper"

export default Wrapper
