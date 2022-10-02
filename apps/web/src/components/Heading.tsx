import { Typography } from "@dmrk/ui"
import clsx from "clsx"
import { AnimationControls, m, Variants } from "framer-motion"
import React, { forwardRef } from "react"

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  subheading?: string
  bodyClass?: string
  heading?: string | React.ReactNode
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  body?: string | React.ReactNode
  controls?: AnimationControls
}

const MotionTypography = m(Typography)

const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  (
    {
      subheading,
      heading,
      body,
      className,
      bodyClass,
      headingTag = "h2",
      controls,
      ...rest
    }: HeadingProps,
    ref
  ) => {
    const TypographyVariant: Variants = {
      initial: {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      animate: (index) => ({
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
          delay: controls ? index * 0.08 : index * 0.08 + 1,
          duration: 0.6,
          type: "spring",
          opacity: {
            duration: 0.7,
          },
        },
      }),
    }
    return (
      <div className={clsx("space-y-6", className)} {...rest} ref={ref}>
        {subheading && (
          <MotionTypography
            as="p"
            variants={TypographyVariant}
            initial="initial"
            animate={controls ?? "animate"}
            custom={0}
            className="uppercase  tracking-[0.2em] text-[0.750rem] lg:text-sm font-bold text-primary font-mono"
          >
            {subheading}
          </MotionTypography>
        )}
        {heading && (
          <>
            <MotionTypography
              as={headingTag}
              variants={TypographyVariant}
              initial="initial"
              animate={controls ?? "animate"}
              custom={1}
              unStyled
              className={clsx("font-bold text-4xl lg:text-5xl  tracking-tight", {
                "mt-8": subheading,
              })}
            >
              {heading}
            </MotionTypography>
          </>
        )}
        {body && (
          <MotionTypography
            //@ts-ignore
            as="p"
            variants={TypographyVariant}
            initial="initial"
            animate={controls ?? "animate"}
            custom={2}
            className={clsx(
              "font-normal text-base  text-primary-superlight/80  leading-[185%] ",
              {
                "mt-4": heading,
              },
              bodyClass
            )}
          >
            {body}
          </MotionTypography>
        )}
      </div>
    )
  }
)

export default Heading

Heading.displayName = "Heading"

export const MotionHeading = m(Heading)
