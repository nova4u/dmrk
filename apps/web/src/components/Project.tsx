import { Typography } from "@dmrk/ui"
import { Figma, Github } from "@dmrk/ui/icons"
import { logos } from "@lib/data"
import clsx from "clsx"
import { default as NextImage } from "next/future/image"

interface ProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  layout: "image-left" | "image-right"
  title: string
  link: string
  subheading: string
  heading: string
  content: string
  image: string // Figma Project URL
  stack: string[] // Stack used
  github?: string // Github Project URL
  figma?: string // Figma Project URL
}

export const Project = ({
  layout = "image-right",
  subheading,
  heading,
  content,
  link,
  title,
  stack,
  github,
  image,
  figma,
  className,
  ...rest
}: ProjectProps) => {
  return (
    <div className={clsx("grid grid-cols-1 lg:grid-cols-2 lg:items-center ", className)} {...rest}>
      <div
        className={clsx(" mx-auto", {
          "lg:col-start-2 lg:row-start-1 ": layout === "image-left",
        })}
      >
        <Typography
          as="span"
          className="text-primary font-mono tracking-wide font-bold text-sm  block "
        >
          {subheading}
        </Typography>
        <a href="https://code.dmrk.dev" target="_blank" rel="noreferrer">
          <Typography as="p" className="font-mono  font-medium  text-4xl mt-2 tracking-tighter  ">
            {heading}
          </Typography>
        </a>
        {(github || figma) && (
          <div className="flex gap-8 mt-5 ">
            {github && (
              <a href={github} target="_blank" rel="noreferrer noindex nofollow">
                <Github className="w-6 h-6 brightness-75 hover:brightness-100 transition hover:-translate-y-px" />
              </a>
            )}
            {figma && (
              <a href={figma} target="_blank" rel="noreferrer noindex nofollow">
                <Figma className="w-6 h-6 hover:brightness-100 brightness-50 transition hover:-translate-y-px" />
              </a>
            )}
          </div>
        )}

        <Typography
          // @ts-ignore
          as="p"
          className=" tracking-wide text-neutral-300 mt-5 max-w-xl lg:max-w-lg leading-[180%]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ul className="flex gap-5  flex-wrap  justify-center lg:justify-start mx-auto lg:mx-0 md:w-fit lg:max-w-lg border-b-0   p-3.5 lg:p-2.5  rounded-lg border bg-gradient-to-r from-transparent  overflow-hidden to-primary-darker/20  border-white/5 relative mt-5">
          <BorderSvg className="absolute bottom-0   inset-x-0 w-full animate-bottomBorderFade " />
          {stack.map((tag, i) => {
            const logo = logos.find((logo) => logo.name === tag)
            if (!logo) return
            return (
              <li className="w-24 h-6 lg:h-8     flex-wrap relative " key={i}>
                <NextImage src={logo.src} fill alt={logo.alt} />
              </li>
            )
          })}
        </ul>
      </div>
      <div
        className={clsx(
          " rounded-lg  flex-shrink-0  transition ease-out  mt-10 lg:mt-0 mx-auto lg:mx-0 justify-self-end relative h-full",
          {
            "lg:col-start-1 lg:row-start-1": layout === "image-left",
          }
        )}
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer nofollow noindex"
          className="block relative "
        >
          <NextImage
            src={image}
            sizes="(max-width: 1024px) 50vw, 100vw"
            width={597}
            height={365}
            className="rounded-lg   object-contain     lg:mt-0  transition ease-out border border-white/10 hover:border-primary  "
            alt="Denis Marushchak photo"
          />
        </a>
      </div>
    </div>
  )
}

export default Project

export const BorderSvg = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="154"
    height="1"
    viewBox="0 0 154 1"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <ellipse cx="76.8936" cy="0.249512" rx="76.4551" ry="0.25" fill="url(#paint0_linear_114_251)" />
    <defs>
      <linearGradient
        id="paint0_linear_114_251"
        x1="22.583"
        y1="0.249507"
        x2="140.151"
        y2="0.249184"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CB69ED" stopOpacity="0" />
        <stop offset="0.254766" stopColor="#15BBE2" />
        <stop offset="0.551648" stopColor="#CB69ED" />
        <stop offset="1" stopColor="#CB69ED" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)
