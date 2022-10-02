import clsx from "clsx"
import React, { forwardRef } from "react"

type TypographyOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string | React.ReactNode
  unStyled?: boolean
  as?: E
}

type TypographyProps<E extends React.ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TypographyOwnProps>

const __DEFAULT_ELEMENT__ = "h2"

function Typography<E extends React.ElementType = typeof __DEFAULT_ELEMENT__>(
  { children, as, className, unStyled = false, ...props }: TypographyProps<E>,
  ref: React.Ref<E>
) {
  const Component = as || __DEFAULT_ELEMENT__
  const isHeading = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(Component as string)

  return (
    <Component
      className={clsx(
        {
          "tracking-tighter text-emerald-50 text-center max-w-sm text-5xl font-bold mx-auto mt-20":
            isHeading && !unStyled,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  )
}

export default forwardRef(Typography)
