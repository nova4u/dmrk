import clsx from "clsx"
import React from "react"

interface PanelProps extends React.HTMLAttributes<HTMLButtonElement> {}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(({ className, children }, ref) => {
  return (
    <div
      className={clsx(
        "  left-1/2 -translate-x-1/2 bottom-10 flex items-center flex-wrap ",
        className
      )}
      ref={ref}
      style={{
        width: "calc(100% - 32px)",
      }}
    >
      {children}
    </div>
  )
})

Panel.displayName = "Panel"

export default Panel
