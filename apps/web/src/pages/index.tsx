import { About, Contact, Hero, Projects } from "@components/Sections"
import { NextPage } from "next"

const Index: NextPage = () => {
  return (
    <>
      <Hero />
      <About img="/denismarushchak.jpg" />
      <Projects />
      <Contact />
    </>
  )
}

export default Index
