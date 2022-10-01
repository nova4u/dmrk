import { Typography } from "@dmrk/ui"
import clsx from "clsx"

interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  subheading?: string
  heading?: string
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  highlight?: string
  body?: string
}

const Heading = ({
  subheading,
  heading,
  body,
  className,
  headingTag = "h2",
  ...rest
}: HeadingProps) => {
  return (
    <div className={clsx("space-y-6", className)} {...rest}>
      {subheading && (
        <Typography
          as="p"
          className="uppercase  tracking-[0.2em] text-[0.750rem] lg:text-sm font-bold text-primary font-mono"
        >
          {subheading}
        </Typography>
      )}
      {heading && (
        <>
          <Typography
            // @ts-expect-error
            as={headingTag}
            unStyled
            className={clsx("font-bold text-4xl lg:text-5xl  tracking-tight", {
              "mt-8": subheading,
            })}
            dangerouslySetInnerHTML={{
              __html: rest.highlight
                ? heading.replace(
                    rest.highlight,
                    `<span class="highlight-text">${rest.highlight}</span>`
                  )
                : heading,
            }}
          />
        </>
      )}
      {body && (
        <Typography
          as="p"
          className={clsx("font-normal text-base  text-primary-superlight/80  leading-[185%]", {
            "mt-4": heading,
          })}
        >
          {body}
        </Typography>
      )}
    </div>
  )
}

export default Heading
