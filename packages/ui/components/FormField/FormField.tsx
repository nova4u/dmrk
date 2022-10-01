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
    <div>
      <label htmlFor={name} className="sr-only">
        {name}
      </label>
      <Component
        className={
          (clsx(
            `block   focus:outline-none focus:ring-1 transition focus:ring-primary bg-transparent border rounded-lg w-full h-10 pl-5 border-primary-darker/40  text-sm font-bold text-primary-light placeholder:text-primary-superlight/50 tracking-normal`,
            {
              "resize-none h-20 pt-2": as === "textarea",
            }
          ),
          className)
        }
        {...props}
      >
        {children}
      </Component>
    </div>
  )
}

export default FormField
