import { NextPage } from "next";
import { Navbar, Typography, Wrapper, Button } from "@dmrk/ui";
import { Github, Figma } from "@dmrk/ui/icons";
import clsx from "clsx";
import React, { FormEvent } from "react";
import { default as NextImage } from "next/future/image";
import { Background, Heading } from "@components/index";

const logos = [
  {
    name: "tailwind",
    src: "/logos/tailwindcss-logotype-white 1.svg",
    alt: "tailwindcss logo",
  },
  {
    name: "nextjs",
    src: "/logos/nextjs.svg",
    alt: "Nextjs logo",
  },
  {
    name: "gatsby",
    src: "/logos/Gatsby.svg",
    alt: "Gatsby logo",
  },
  {
    name: "astro",
    src: "/logos/astro.svg",
    alt: "Astro logo",
  },
  {
    name: "framer",
    src: "/logos/framer.svg",
    alt: "framer logo",
  },
  {
    name: "turborepo",
    src: "/logos/turborepo.svg",
    alt: "turborepo logo",
  },
  {
    name: "supabase",
    src: "/logos/supabase.svg",
    alt: "supabase logo",
  },
  {
    name: "wordpress",
    src: "/logos/WordPress.svg",
    alt: "WordPress logo",
  },
  {
    name: "strapi",
    src: "/logos/strapi.svg",
    alt: "Strapi logo",
  },
  {
    name: "contentful",
    src: "/logos/contentful.svg",
    alt: "Contentful logo",
  },
  {
    name: "figma",
    src: "/logos/Figma.svg",
    alt: "Figma logo",
  },
];

interface ProjectProps extends React.HTMLAttributes<HTMLDivElement> {
  layout: "image-left" | "image-right";
  title: string;
  link: string;
  subheading: string;
  heading: string;
  content: string;
  image: string; // Figma Project URL
  stack: string[]; // Stack used
  github?: string; // Github Project URL
  figma?: string; // Figma Project URL
}

export const Overlay = () => {
  return (
    <div className="absolute inset-0 bg-primary/10 w-full h-full hover:opacity-0 transition"></div>
  );
};

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
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 mt-40 items-center",
        className
      )}
      {...rest}
    >
      <div
        className={clsx({
          "lg:col-start-2 lg:row-start-1": layout === "image-left",
        })}
      >
        <Typography
          as="span"
          className="text-primary font-mono tracking-wide font-bold text-sm"
        >
          {subheading}
        </Typography>
        <a href="https://code.dmrk.dev" target="_blank" rel="noreferrer">
          <Typography
            as="p"
            className="font-mono  font-medium  text-4xl mt-2 tracking-tighter"
          >
            {heading}
          </Typography>
        </a>
        {(github || figma) && (
          <div className="flex gap-6 mt-5 ">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer noindex nofollow"
              >
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
          className=" tracking-wide text-neutral-200 text-sm  mt-5 max-w-lg leading-[180%]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-10">
          <ul className="flex gap-2 mt-4 flex-wrap">
            {stack.map((tag, i) => {
              const logo = logos.find((logo) => logo.name === tag);
              if (!logo) return;
              return (
                <li
                  className=" py-0.5 px-2 rounded-full flex items-center justify-center h-6"
                  key={i}
                >
                  <NextImage
                    src={logo.src}
                    width="150"
                    className="h-full flex-grow w-auto"
                    height="40"
                    alt={logo.alt}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={clsx(
          "overflow-hidden rounded-lg  flex-shrink-0  transition ease-out max-w-lg mt-10 lg:mt-0 mx-auto lg:mx-0 justify-self-end relative h-full flex items-center",
          {
            "lg:col-start-1 lg:row-start-1": layout === "image-left",
          }
        )}
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary-dark to-transparent  h-full -z-10"></div>
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-primary-dark to-transparent  h-full -z-10"></div>
        <div className="absolute inset-y-0 right-16 w-px bg-gradient-to-b from-transparent via-primary-dark to-transparent  h-full -z-10"></div>
        <div className="absolute inset-y-0 left-16 w-px bg-gradient-to-b from-transparent via-primary-dark to-transparent  h-full -z-10"></div>
        <div className="relative">
          <NextImage
            src={image}
            width={600}
            height={400}
            className="rounded-lg  object-cover w-full  lg:mt-0  transition ease-out border border-white/40 hover:border-primary "
            alt="Denis Marushchak photo"
          />
          <Overlay />
        </div>
      </div>
    </div>
  );
};

const Index: NextPage = ({}) => {
  const handleSubmit = React.useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form));
    console.log(formData);
    await fetch(`https://formspree.io/f/xjvzwdjj`, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(formData),
    });
    form.reset();
  }, []);
  return (
    <div className="">
      <Wrapper className="text-neutral-100 font-sans mb-28 relative text-left md:text-center">
        <Navbar className="mt-10 z-20 relative" />
        <Background className="absolute -top-20  left-0  w-full h-full -z-10 " />
        <div className="flex items-center justify-center mt-28  md:mt-36 gap-2 md:gap-4 max-w-3xl flex-wrap mx-auto">
          {logos.map((logo, i) => (
            <div
              className="bg-primary-darkest/95 h-auto  py-2 px-2  rounded-md flex items-center  justify-center flex-col gradient-box"
              key={i}
            >
              <NextImage
                src={logo.src}
                width="80"
                height="10"
                className=" flex-grow w-auto h-5 md:h-7"
                alt={logo.alt}
              />
            </div>
          ))}
        </div>

        <Heading
          className="mt-32 mx-auto   max-w-2xl"
          subheading={`Front-End Dev / UI Designer`}
          highlight="beautiful"
          heading={`Let's build something beautiful together.`}
          body={`I'm Denis, a Front-End Developer who can do UI / UX Design. I focus on
          delievering high-level UX through good looking interfaces, well-built
          and easy to maintain websites.
        `}
        />
        <Button
          variant="primary"
          className="mt-7 bg-gradient-to-b from-primary to-primary-dark shadow-xl shadow-primary/5 text-primary-darkest self-center hover:-translate-y-px"
          color="custom"
        >
          Contact Me
        </Button>
      </Wrapper>

      <section className="  py-10 text-white ">
        <Wrapper className="lg:flex mt-20 items-center justify-between relative">
          <Background className="absolute -bottom-40 -right-1/4 -z-10" />
          <Heading
            className="max-w-lg"
            subheading={"Introduction"}
            highlight={"myself."}
            heading={`A little bit about myself.`}
            body={`Thanks you for visiting my page!  My name is Denis and I enjoy building things, I get such a  joy from creating something beautiful and entertaining. My first introduction to web development happened during my university days in 2012, there we learnt the basics of HTML, CSS, some JavaScript, also there are few more programming language like C#, C++ and some more. 
To be honest, while writing this out, I realised that I wrote so much that I can create an article about this, don't want to make read all my life-story. 
Let's get to the point, I started as an UI Designer and i did pretty good IMO, I was very curious in how to actually build my own design, that how I got to where I am at the moment.
`}
          />
          <div className="w-fit relative gradient-box rounded-md mx-auto lg:mx-0 group ">
            <NextImage
              src={`/denismarushchak.jpg`}
              width={460}
              height={614}
              className="rounded-lg  object-cover mt-10 lg:mt-0 h-auto relative z-10 transition"
              alt="Denis Marushchak photo"
            />
          </div>
        </Wrapper>
      </section>
      <section className="  py-10 text-white ">
        <Wrapper className="mt-20 ">
          <Heading
            className="max-w-xl text-center mx-auto w-full"
            subheading={"Featured"}
            highlight="projects."
            heading={`Latest projects.`}
          />
          <div id="projects">
            <Project
              layout="image-right"
              image={"/projects/pointofsalenet.jpg"}
              github="https://github.com/nova4u/dmrk"
              figma="https://github.com/nova4u/dmrk"
              stack={["nextjs", "tailwind", "turborepo"]}
              subheading={`Personal project`}
              link={`https://code.dmrk.dev`}
              heading={`code.dmrk.dev`}
              content={`Code screenshot generator, made in Next.js, highly inspired by
          <a
            href="https://carbon.sh"
            target="_blank"
            class="text-primary hover:brightness-150 transition ease-out"
            rel="noreferrer noindex nofollow"
          >
            carbon.sh.
          </a>
          Personal project, which was made for self-educating and practice
          purposes. I have utilised monorepo with configs and UI component
          library under the different packages. The same UI component library is
          used for the website, you currently reading. I got many ideas on how
          to it can be improved, there are many features on my mind, hope I
          would have some time to keep updating it. The source code is
          open-source and can be found on the github link below.`}
              title={"code.dmrk.dev"}
            />
            <Project
              layout="image-right"
              image={"/projects/retry.com.jpg"}
              stack={["wordpress", "gatsby", "tailwind"]}
              subheading={`Marketing website`}
              link={`https://retry.com`}
              heading={`retry.com`}
              content={`Code screenshot generator, made in Next.js, highly inspired by
       
          Personal project, which was made for self-educating and practice
          purposes. I have utilised monorepo with configs and UI component
          library under the different packages. The same UI component library is
          used for the website, you currently reading. I got many ideas on how
          to it can be improved, there are many features on my mind, hope I
          would have some time to keep updating it. The source code is
          open-source and can be found on the github link below.`}
              title={"code.dmrk.dev"}
            />
            <Project
              layout="image-right"
              image={"/projects/retry.com.jpg"}
              stack={["wordpress", "gatsby", "tailwind", "framer"]}
              subheading={`Marketing website`}
              link={`https://pointofsale.net`}
              heading={`pointofsale.net`}
              content={`Code screenshot generator, made in Next.js, highly inspired by
       
          Personal project, which was made for self-educating and practice
          purposes. I have utilised monorepo with configs and UI component
          library under the different packages. The same UI component library is
          used for the website, you currently reading. I got many ideas on how
          to it can be improved, there are many features on my mind, hope I
          would have some time to keep updating it. The source code is
          open-source and can be found on the github link below.`}
              title={"code.dmrk.dev"}
            />
            <Project
              layout="image-right"
              image={"/projects/retry.com.jpg"}
              stack={["wordpress", "tailwind"]}
              subheading={`Marketing website`}
              link={`https://retry.com`}
              heading={`erply.com`}
              content={`Code screenshot generator, made in Next.js, highly inspired by
       
          Personal project, which was made for self-educating and practice
          purposes. I have utilised monorepo with configs and UI component
          library under the different packages. The same UI component library is
          used for the website, you currently reading. I got many ideas on how
          to it can be improved, there are many features on my mind, hope I
          would have some time to keep updating it. The source code is
          open-source and can be found on the github link below.`}
              title={"code.dmrk.dev"}
            />
          </div>
        </Wrapper>
      </section>
      <section className="">
        <Wrapper className="text-primary-superlight text-left md:text-center my-40 relative">
          <Heading
            className=""
            subheading="contact"
            heading="Always ready to talk."
            highlight="talk."
          />
          <form
            className="p-10 bg-primary-darkest gradient-box w-auto max-w-xl rounded-lg mx-auto mt-20  space-y-4 shadow-primary/5 shadow-xl "
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name"></label>
              <input
                className=" block   focus:outline-none focus:ring-1 transition focus:ring-primary bg-transparent border rounded-lg w-full h-10 pl-5 border-primary-darker/40  text-sm font-bold text-primary-light placeholder:text-primary-superlight/50
tracking-normal"
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="name"></label>
              <input
                className=" block   focus:outline-none focus:ring-1 transition focus:ring-primary bg-transparent border rounded-lg w-full h-10 pl-5 border-primary-darker/40  text-sm font-bold text-primary-light placeholder:text-primary-superlight/50
tracking-normal"
                type="text"
                name="email"
                placeholder="Contact Email"
              />
            </div>
            <div>
              <label htmlFor="name"></label>
              <textarea
                className="resize-none block text-sm font-bold text-primary-light placeholder:text-primary-superlight/50   focus:outline-none focus:ring-1 transition focus:ring-primary bg-transparent border rounded-lg w-full  pl-5 border-primary-darker/40 h-20 pt-2 tracking-normal"
                name="message"
                placeholder="Message"
              ></textarea>
            </div>
            <Button className="w-full hover:-translate-y-px ">Send</Button>
          </form>
          <Background className="absolute top-20 left-1/5 w-full h-full -z-10" />
          <div className="w-40 h-40 absolute bottom-5 left-1/2 bg-indigo-700 rounded-full blur-[90px] -z-10"></div>
          <div className="w-40 h-40 absolute bottom-10 left-1/4 bg-primary rounded-full blur-[90px] -z-10"></div>
        </Wrapper>
      </section>
    </div>
  );
};

export default Index;
