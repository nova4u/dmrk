import clsx from "clsx"
import React from "react"

interface WrapperProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  padding?: "default" | "top" | "bottom" | "none"
  id?: string
}

const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps>(
  ({ children, id, className, padding = "default", ...rest }, ref) => {
    return (
      <section
        className={clsx({
          "py-24 pd:py-32 lg:py-36": padding === "default",
          "pt-24 pd:pt-32 lg:pt-36": padding === "top",
          "pb-24 pd:pb-32 lg:pb-36": padding === "bottom",
        })}
        {...{ id }}
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
