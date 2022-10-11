import { Background, Heading } from "@components/index"
import { Navbar, Wrapper } from "@dmrk/ui"
import { logos } from "@lib/data"
import { m, useScroll, useTransform, useWillChange } from "framer-motion"
import { default as NextImage } from "next/future/image"
import Link from "next/link"
import { FC, useRef } from "react"

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const section = useRef<HTMLDivElement>(null)
  const { scrollYProgress, scrollY } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  })
  const willChange = useWillChange()
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <Wrapper
      className="text-neutral-100 font-sans relative text-left md:text-center"
      padding="bottom"
      ref={section}
    >
      <Navbar className="pt-6 lg:pt-8 z-20 relative " />
      <m.div
        style={{
          y,
          willChange,
        }}
        initial={{
          x: -60,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 3,
        }}
        className="absolute  top-5 -left-1/2 lg:top-0  md:left-0  w-full h-auto -z-10"
      >
        <Background />
      </m.div>
      <m.div className="transition ease-out flex items-center justify-center mt-28  md:mt-36 gap-2 md:gap-4 max-w-3xl flex-wrap mx-auto">
        {logos.map((logo, i) => (
          <m.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              ease: "easeOut",
              delay: 0.07 * i,
            }}
            style={{
              willChange,
            }}
            className="bg-primary-darkest/95 rounded-md"
            key={i}
          >
            <div className="p-px rounded-md   gradient-box flex bg-transparent ">
              <div className="py-2 px-2 flex items-center w-auto h-auto bg-primary-darkest rounded-md ">
                <NextImage
                  src={logo.src}
                  width={logo.width}
                  height={28}
                  className="flex-grow w-auto h-5 md:h-7"
                  alt={logo.alt}
                />
              </div>
            </div>
          </m.div>
        ))}
      </m.div>

      <Heading
        subheading={`Front-End Dev / UI Designer`}
        className="mt-32 mx-auto   max-w-2xl"
        heading={
          <>
            Let&apos;s build something <br />
            <span className="highlight-text">beautiful</span> together
          </>
        }
        body={`I'm Denis Marushchak, a Front-End Developer who is capable of UI / UX Design. I focus on
          delievering engaging UI, well-built
          and easy to maintain websites.
        `}
      />
      <Link href="#contact" scroll>
        <m.button
          initial={{
            y: 40,
            opacity: 0,
            rotate: 2,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            delay: 1.5,
          }}
          className="mt-7 bg-gradient-to-b from-primary to-primary-dark shadow-xl shadow-primary/5 text-primary-darkest self-center hover:-translate-y-px px-4 py-2 font-medium hover:brightness-125 transition ease-out cursor-pointer  hover:shadow-none rounded-md inline-block"
        >
          Contact Me
        </m.button>
      </Link>
    </Wrapper>
  )
}

export default Hero
