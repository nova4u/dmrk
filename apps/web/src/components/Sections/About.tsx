import { Background, Heading } from "@components/index"
import { Wrapper } from "@dmrk/ui"
import {
  m,
  MotionConfig,
  useAnimationControls,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion"
import { default as NextImage } from "next/future/image"
import { FC, useEffect, useRef } from "react"

interface AboutProps {
  img: string
}

const About: FC<AboutProps> = ({ img }) => {
  const photoRef = useRef(null)
  const textRef = useRef(null)
  const isTextInView = useInView(textRef, {
    amount: 0.4,
    once: true,
  })
  const isPhotoInView = useInView(photoRef, {
    amount: 0.3,
    once: true,
  })
  const controls = useAnimationControls()

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  })

  let x = useTransform(scrollYProgress, [0, 1], ["0%", "13%"])

  useEffect(() => {
    if (!isTextInView) return
    controls.start("animate")
  }, [isTextInView, controls])

  return (
    <MotionConfig
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <Wrapper className="lg:flex items-center justify-between relative text-primary-superlight">
        <m.div className="absolute -bottom-40 -right-1/4 -z-10" style={{ x }}>
          <Background />
        </m.div>
        <Heading
          controls={controls}
          ref={textRef}
          className="max-w-lg md:text-center lg:text-left md:mx-auto"
          subheading={"Introduction"}
          bodyClass="text-left"
          heading={
            <>
              A little bit about <span className="highlight-text">myself.</span>
            </>
          }
          body={
            <>
              My name is Denis Marushchak and I am a web developer with a passion for creating and building engaging online experiences.
              My journey in the field started with  <span className={"highlight-md"}>UI design</span> and eventually
              led me to <span className={"highlight-md"}>full-stack web development</span>,
              where I have gained expertise in technologies such as <span className={"highlight-md"}>React, Node.js, and Express</span>.
              <br />
              <br />
              I have a strong background in <span className={"highlight-md"}>WordPress development</span>,
              including custom theme and plugin creation as well as API endpoints development.
              My recent projects  includes  applications built with N<span className={"highlight-md"}>ext.js,
              Gatsby, Prisma, WordPress as a Headless CMSs</span> and other tech, marketing websites using SSG frameworks like Gatsby, Next.js.
              I have experience writing tests using tools such as <span className={"highlight-md"}>Jest, Cypress, and Playwright</span> to ensure the quality and reliability
              of my code. My skillset includes working with custom APIs, combining data from multiple endpoints,
              implementing authorization and filtering, ensuring efficient API calls through techniques like caching and response validation,
              and more.
              <br />
              <br />
              As a continuous learner, I am always seeking to stay up-to-date on the latest developments and trends in the field.
              I am dedicated to constantly improving my skills and knowledge and believe in the importance of staying current in this
              fast-paced industry.
            </>
          }
        />
        <m.div
          animate={{
            x: isPhotoInView ? 0 : 30,
            opacity: isPhotoInView ? 1 : 0,
            scale: isPhotoInView ? 1 : 0.95,
            originY: 0,
          }}
          ref={photoRef}
          transition={{
            duration: 0.4,
            type: "easeOut",
            opacity: {
              duration: 0.6,
            },
          }}
          className="relative overflow-hidden mx-auto w-fit  rounded-lg lg:mx-0 group pb-px  shadow-2xl shadow-primary/15 border border-white/10 mt-10 lg:mt-0"
        >
          <NextImage
            sizes={"(max-width: 1024px) 100vw, 50vw"}
            src={img}
            width={460}
            height={614}
            className="rounded-[inherit]  object-cover  relative z-10 transition lg:max-h-full bg-black"
            alt="Denis Marushchak photo"
          />
          <span className="absolute bottom-0 h-2 inset-x-0 bg-gradient-to-r from-transparent via-indigo-600 to-primary  animate-pulse blur-[1px]"></span>
        </m.div>
      </Wrapper>
    </MotionConfig>
  )
}

export default About
