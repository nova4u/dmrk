import { About, Contact, Hero, Projects } from "@components/Sections"
import { domAnimation, LazyMotion } from "framer-motion"
import { NextPage } from "next"

const Index: NextPage = () => {
  return (
    <>
      <LazyMotion features={domAnimation} strict>
        <Hero />
        <About img="/denismarushchak.jpg" />
        <Projects />
        <Contact />
      </LazyMotion>
    </>
  )
}

export default Index
