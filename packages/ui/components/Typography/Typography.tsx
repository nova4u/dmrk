import clsx from "clsx"
import React from "react"

type TypographyOwnProps<E extends React.ElementType = React.ElementType> = {
  children: string | React.ReactNode
  unStyled?: boolean
  as?: E
}

type TypographyProps<E extends React.ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TypographyOwnProps>

const __DEFAULT_ELEMENT__ = "h2"

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"]

const Typography = React.forwardRef(
  <C extends React.ElementType = typeof __DEFAULT_ELEMENT__>(
    { as, unStyled, children, className }: TypographyProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
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
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = "Typography"

export default Typography
