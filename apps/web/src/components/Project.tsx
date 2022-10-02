import { Typography as Typo } from "@dmrk/ui"
import { Figma, Github } from "@dmrk/ui/icons"
import { logos } from "@lib/data"
import clsx from "clsx"
import { m, useAnimationControls, useInView, Variants } from "framer-motion"
import { default as NextImage } from "next/future/image"
import { useEffect, useRef } from "react"
import BorderSvg from "./BorderSvg"

const Typography = m(Typo)
const DELAY = 0.1

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

const variants: Variants = {
  hidden: {
    y: 20,
    scale: 0.95,
    opacity: 0,
  },
  animate: (index) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * DELAY,
      duration: 0.5,
    },
  }),
}

const stackVariants: Variants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    originX: 0,
  },
  animate: (index) => ({
    opacity: 1,
    scaleX: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.6,
      delay: index * DELAY,
    },
  }),
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
  figma,
  image,
  className,
  ...rest
}: ProjectProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    amount: 0.4,
    once: true,
  })
  const controls = useAnimationControls()

  useEffect(() => {
    if (!isInView) return
    controls.start("animate")
  }, [isInView])

  return (
    <div
      ref={containerRef}
      className={clsx("grid grid-cols-1 lg:grid-cols-2 lg:items-center ", className)}
      {...rest}
    >
      <div
        className={clsx(" mx-auto", {
          "lg:col-start-2 lg:row-start-1 ": layout === "image-left",
        })}
      >
        <Typography
          initial={"hidden"}
          variants={variants}
          animate={controls}
          as="span"
          className="text-primary font-mono tracking-wide font-bold text-sm  block"
        >
          {subheading}
        </Typography>
        <a href="https://code.dmrk.dev" target="_blank" rel="noreferrer">
          <Typography
            variants={variants}
            custom={1}
            initial="hidden"
            animate={controls}
            as="p"
            className="font-mono  font-medium  text-4xl mt-2 tracking-tighter  "
          >
            {heading}
          </Typography>
        </a>
        {(github || figma) && (
          <m.div
            initial={"hidden"}
            animate={controls}
            variants={variants}
            custom={2}
            className="flex gap-8 mt-5 "
          >
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
          </m.div>
        )}

        <Typography
          initial={"hidden"}
          variants={variants}
          custom={3}
          animate={controls}
          as="p"
          className=" tracking-wide text-neutral-300 mt-5 max-w-xl lg:max-w-lg leading-[180%]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <m.ul
          variants={stackVariants}
          custom={4}
          initial={"hidden"}
          animate={controls}
          className="flex gap-5  flex-wrap  justify-center lg:justify-start mx-auto lg:mx-0 md:w-fit lg:max-w-lg border-b-0   p-3.5 lg:p-2.5  rounded-lg border bg-gradient-to-r from-transparent  overflow-hidden to-primary-darker/20  border-white/5 relative mt-5"
        >
          <BorderSvg className="absolute bottom-0   inset-x-0 w-full animate-bottomBorderFade " />
          {stack.map((tag, i) => {
            const logo = logos.find((logo) => logo.name === tag)
            if (!logo) return
            return (
              <m.li
                variants={{
                  hidden: {
                    y: 20,
                    opacity: 0,
                  },
                  animate: {
                    y: 0,
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="w-24 h-6 lg:h-8     flex-wrap relative "
                key={i}
              >
                <NextImage src={logo.src} fill alt={logo.alt} />
              </m.li>
            )
          })}
        </m.ul>
      </div>
      <m.div
        initial={"hidden"}
        variants={{
          hidden: {
            opacity: 0,
            x: 50,
            originX: 1,
          },
          animate: (index) => ({
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              delay: index * DELAY,
            },
          }),
        }}
        animate={controls}
        custom={6}
        className={clsx(
          " rounded-lg  flex-shrink-0  transition ease-out  mt-10 lg:mt-0 mx-auto lg:mx-0 justify-self-end relative h-full",
          {
            "lg:col-start-1 lg:row-start-1": layout === "image-left",
          }
        )}
      >
        <a href={link} target="_blank" rel="noreferrer nofollow noindex" className="block relative">
          <NextImage
            src={image}
            sizes="(max-width: 1024px) 50vw, 100vw"
            width={597}
            height={365}
            className="rounded-lg   object-contain     lg:mt-0  transition ease-out border border-white/10 hover:border-primary  "
            alt="Denis Marushchak photo"
          />
        </a>
      </m.div>
    </div>
  )
}

export default Project
