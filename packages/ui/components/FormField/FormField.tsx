import clsx from "clsx"
import React, { ChangeEvent, PropsWithChildren } from "react"

type SupportedElements = "textarea" | "input"

type FormFieldOwnProps<E extends React.ElementType = SupportedElements> = {
  as?: E
  onChange?: (e: ChangeEvent<E extends "input" ? HTMLInputElement : HTMLTextAreaElement>) => void
}
type FormFieldProps<E extends React.ElementType> = FormFieldOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof FormFieldOwnProps>

const __DEFAULT_ELEMENT__ = "input"

function FormField<E extends React.ElementType = typeof __DEFAULT_ELEMENT__>({
  children,
  as,
  name,
  className,
  ...props
}: PropsWithChildren<FormFieldProps<E>>) {
  const Component = as || __DEFAULT_ELEMENT__

  return (
    <div className="relative">
      <Component
        className={clsx(
          `form__field block   focus:outline-none focus:ring-1 transition focus:ring-primary bg-transparent border rounded-lg w-full h-10 pl-5 border-primary-darker/40  text-sm font-medium text-primary-light placeholder:opacity-0 peer `,
          {
            "resize-none h-20 pt-2": as === "textarea",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
      <label
        htmlFor={name}
        className="form__label absolute top-1.5 left-3 first-letter:uppercase text-primary-superlight/50  transition-transform ease-out pointer-events-none  origin-left py-1 px-1.5 block rounded-[inherit] text-sm"
      >
        {name}
      </label>
    </div>
  )
}

export default FormField
