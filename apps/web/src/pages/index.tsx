import { About, Contact, Hero, Projects } from "@components/Sections"
import { domAnimation, LazyMotion } from "framer-motion"
import { NextPage } from "next"
import Head from "next/head"

const Index: NextPage = () => {
  return (
    <>
      <SEO
        title="Denis Marushchak - Developer, UI/UX Designer."
        description="Front-end developer, who can do UI design."
      />
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

interface SEOProps {
  title: string
  description: string
}

const SEO = ({ title, description }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={description} name="description" />
      <meta property="og:url" content={`https://dmrk.dev`} />
      <link rel="canonical" href={`https://dmrk.dev`} />
      <meta property="og:site_name" content="Denis Marushchak" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={"https://dmrk.dev/banner.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@denisdenis_" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={"https://dmrk.dev/banner.jpg"} />
    </Head>
  )
}
