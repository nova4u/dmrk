import React, { FC, HTMLAttributes } from "react"
import clsx from "clsx"

interface WrapperProps extends HTMLAttributes<HTMLDivElement> {}

const Wrapper: FC<React.PropsWithChildren<WrapperProps>> = ({ children, className, ...rest }) => {
  return (
    <div className={clsx("max-w-screen-xl px-6 mx-auto", className)} {...rest}>
      {children}
    </div>
  )
}

export default Wrapper
