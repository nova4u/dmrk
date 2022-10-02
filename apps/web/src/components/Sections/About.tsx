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
  }, [isTextInView])

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
          highlight={"myself."}
          bodyClass="text-left"
          heading={`A little bit about myself.`}
          body={`My name is Denis and I enjoy building things, I get such a joy from creating something beautiful and entertaining. My journey into web development started from <span class="highlight-md">UI Design</span>, apparently designing interfaces wasn't enough for me, so I decided to go all in on building it. 
      <br />    
      <br />    
          In the web development field, I started as a <span class="highlight-md">WordPress</span> developer, I was building <span class="highlight-md">custom themes, plugins, custom api endpoint</span>, WordPerss is full of possibilities, you can integrate anything.
<br />
<br />
          After <span class="highlight-md">WordPress</span>, I decided to start learning <span class="highlight-md">React, Node.js, Express</span> and all the modern stuff, you need to know to become a web dev.
          <br />
          <br />

          My latest projects include marketing web sites of any scale built using SSG frameworks like <span class="highlight-md">Next.js / Gatsby</span> and any kind of <span class="highlight-md">Headless CMS</span> to store all the data, applications using <span class="highlight-md">Prisma</span>, <span class="highlight-md">Supabase/Firebase</span>. 
          <br />
          <br />
          I do enjoy learning new things, I follow the web development trends and read all the news regarding new tech. You should have seen my twitter feed, it's all about web development.
          
          
`}
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
