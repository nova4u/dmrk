import { Heading, Project } from "@components/index"
import { Wrapper } from "@dmrk/ui"
import { useAnimationControls, useInView } from "framer-motion"
import { FC, useEffect, useRef } from "react"

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  const textRef = useRef(null)
  const isTextInView = useInView(textRef, {
    amount: 0.4,
    once: true,
  })
  const controls = useAnimationControls()

  useEffect(() => {
    if (!isTextInView) return
    controls.start((index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }))
  }, [isTextInView, controls])

  return (
    <Wrapper className="text-primary-superlight ">
      <Heading
        ref={textRef}
        controls={controls}
        className="max-w-xl md:text-center mx-auto w-full"
        subheading={"Featured"}
        heading={
          <>
            Most recent <span className="highlight-text">projects.</span>
          </>
        }
      />
      <div className="space-y-20 lg:space-y-40 mt-20 lg:mt-40">
        <Project
            layout="image-right"
            image={"/projects/pdfgeneratorapi.jpeg"}
            stack={["nextjs", "tailwind",  "typescript", "wordpress"]}
            subheading={`Marketing website`}
            link={`https://pdfgeneratorapi.com`}
            heading={`pdfgeneratorapi.com`}
            content={`The website is powered by WordPress as a headless CMS. I have utilized Advanced Custom Fields with flexible fields to enable dynamic page layout creation from the WordPress admin panel and. This allows for easy customization and quick deployment of new marketing pages. The website features customizable content sections that can be easily managed from the WordPress backend. With this setup, it's easy to keep your marketing efforts up to date and effective.`}
            title={"pdfgeneratorapi.com"}
        />
        <Project
          layout="image-right"
          image={"/projects/codedmrkdev.jpeg"}
          github="https://github.com/nova4u/dmrk"
          figma="https://github.com/nova4u/dmrk"
          stack={["nextjs", "tailwind", "turborepo"]}
          subheading={`Personal project`}
          link={`https://code.dmrk.dev`}
          heading={`code.dmrk.dev`}
          content={
            <>
              Code screenshot generator, made in Next.js, highly inspired by
              <a
                href="https://carbon.sh"
                target="_blank"
                className="text-primary hover:brightness-150 transition ease-out"
                rel="noreferrer noindex nofollow"
              >
                {" "}
                carbon.sh.{" "}
              </a>
              Personal project, which was made for self-educating and practice purposes. I have
              utilised monorepo with configs and UI component library under the different packages.
              The same UI component library is used for the website, you currently reading. I got
              many ideas on how to it can be improved, there are many features on my mind, hope I
              would have some time to keep updating it. The source code is open-source and can be
              found on the github link below.
            </>
          }
          title={"code.dmrk.dev"}
        />

        <Project
            layout="image-right"
            image={"/projects/retrycom.jpg"}
            stack={["wordpress", "gatsby", "tailwind"]}
            subheading={`Marketing website`}
            link={`https://retry.com`}
            heading={`retry.com`}
            content={`Basic marketing projects that consists of two products. WordPress is used as a Headless CMS, to source all the data. Everything is being controlled from the WordPress, all the info is being sourced from there. I used the Advanced Custom Fields with the combination of flexible fields, to build the page layout on the fly. Basically the project consists of different content sections, that are highly customizable from the WordPress admin panel. Easy to use, when you need to quickly push new marketing page. `}
            title={"code.dmrk.dev"}
        />
        <Project
          layout="image-right"
          image={"/projects/pointofsalenet.jpeg"}
          stack={["wordpress", "gatsby", "tailwind", "framer"]}
          subheading={`Marketing website`}
          link={`https://pointofsale.net`}
          heading={`pointofsale.net`}
          content={`Another marketing page for the point of sale product, using WordPress as a Headless CMS with a combition of Advanced Custom Fields to create powerful, highly adjustable layouts. Using Gatsby to source all the data from the WordPress on render, headers, footers, all the text contents, everything is coming from the WordPress. The projects contains 3 templates, one for building marketing pages, which consist of many reusable content blocks, where you can change the order or any content inside. Blog post template for the posts, and another product template for the products displayed.`}
          title={"code.dmrk.dev"}
        />
        <Project
          layout="image-right"
          image={"/projects/erplycom.jpeg"}
          stack={["wordpress", "tailwind"]}
          subheading={`Marketing website`}
          link={`https://erply.com`}
          heading={`erply.com`}
          content={`This is the main marketing website for the ERPLY. It consists of more than 1000 pages, the idea was to rebuild an old website and keep all the blog posts. First we have created a design of the main page, custom templates for different types of pages, it consists of more than 10 templates overall. The website is built as a WordPress custom theme, built from scratch, with lots of integrations and customizations. I have worked on 3 custom plugins, used internally in the WordPress admin menu. Highly customizable website thanks to Advanced Custom Fields, pretty much 95% of the content is being connected to the admin panel, where it is possible to change all the content.`}
          title={"code.dmrk.dev"}
        />
      </div>
    </Wrapper>
  )
}

export default Projects
