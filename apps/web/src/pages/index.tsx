import { NextPage } from "next";
import { Navbar, Typography, Wrapper, Button, FormField } from "@dmrk/ui";
import { Github, Figma } from "@dmrk/ui/icons";
import clsx from "clsx";
import React, { FormEvent } from "react";
import { default as NextImage } from "next/future/image";
import { Background, Heading } from "@components/index";
import Link from "next/link";

const logos = [
  {
    name: "tailwind",
    src: "/logos2/tailwindcss.svg",
    alt: "tailwindcss logo",
    width: 214.66,
  },
  {
    name: "nextjs",
    src: "/logos2/nextjs.svg",
    alt: "Nextjs logo",
    width: 138,
  },
  {
    name: "gatsby",
    src: "/logos2/Gatsby.svg",
    alt: "Gatsby logo",
    width: 107.33,
  },
  {
    name: "astro",
    src: "/logos2/astro.svg",
    alt: "Astro logo",
    width: 82.88,
  },
  {
    name: "framer",
    src: "/logos2/framer-motion.svg",
    alt: "framer logo",
    width: 93.69,
  },
  {
    name: "turborepo",
    src: "/logos2/turborepo.svg",
    alt: "turborepo logo",
    width: 126,
  },
  {
    name: "supabase",
    src: "/logos/supabase.svg",
    alt: "supabase logo",
    width: 143.95,
  },
  {
    name: "wordpress",
    src: "/logos2/wordpress.svg",
    alt: "WordPress logo",
    width: 129.91,
  },
  {
    name: "strapi",
    src: "/logos2/strapi.svg",
    alt: "Strapi logo",
    width: 108.5,
  },
  {
    name: "contentful",
    src: "/logos2/contentful.svg",
    alt: "Contentful logo",
    width: 131.01,
  },
  {
    name: "figma",
    src: "/logos2/Figma.svg",
    alt: "Figma logo",
    width: 72.14,
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
    <div className="absolute inset-0 bg-primary/10 w-full h-full hover:opacity-0 transition rounded-[inherit]"></div>
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
        "grid grid-cols-1 lg:grid-cols-2 items-center",
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
          className=" tracking-wide text-neutral-300 mt-5 max-w-xl lg:max-w-lg leading-[180%]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-10">
          <ul className="flex gap-5 mt-4 flex-wrap  w-fit lg:max-w-lg bg-primary-darker/20 p-2  rounded-lg border border-white/5 ">
            {stack.map((tag, i) => {
              const logo = logos.find((logo) => logo.name === tag);
              if (!logo) return;
              return (
                <li className="w-24 h-6 lg:h-8     flex-wrap relative " key={i}>
                  <NextImage src={logo.src} fill alt={logo.alt} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={clsx(
          " rounded-lg  flex-shrink-0  transition ease-out max-w-lg mt-10 lg:mt-0 mx-auto lg:mx-0 justify-self-end relative h-full flex items-center ",
          {
            "lg:col-start-1 lg:row-start-1": layout === "image-left",
          }
        )}
      >
        <div className="relative gradient-border">
          <NextImage
            src={image}
            quality={100}
            width={1920}
            height={1080}
            className="rounded-lg aspect-auto  object-cover   lg:mt-0  transition ease-out border border-white/10 hover:border-primary "
            alt="Denis Marushchak photo"
          />
          {/* <Overlay /> */}
        </div>
      </div>
    </div>
  );
};

const emailValidation = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
};

const __DEFAULT_FORM_DATA__ = {
  email: "",
  name: "",
  message: "",
};

const Index: NextPage = ({}) => {
  const [formData, setFormData] = React.useState(__DEFAULT_FORM_DATA__);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (e: FormEvent) => {
      setError(null);
      e.preventDefault();

      if (!formData.name) {
        setError(`Please fill your name`);
        return;
      }

      if (!formData.email || !emailValidation(formData.email)) {
        setError(`Email seems incorrect... :(`);
        return;
      }

      if (!formData.message) {
        setError(`Looks like your forgot to leave me a message :(`);
        return;
      }

      await fetch(`https://formspree.io/f/xjvzwdjj`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      setError(null);
      setFormData(__DEFAULT_FORM_DATA__);
    },
    [formData]
  );

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
                width={logo.width}
                height={28}
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
        <Link href="#contact-me" scroll>
          <a className="mt-7 bg-gradient-to-b from-primary to-primary-dark shadow-xl shadow-primary/5 text-primary-darkest self-center hover:-translate-y-px px-4 py-2 font-medium hover:brightness-125 transition ease-out  hover:shadow-none rounded-md inline-block">
            Contact Me
          </a>
        </Link>
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
          <div
            id="projects"
            className="space-y-20 lg:space-y-40 mt-20 lg:mt-40"
          >
            <Project
              layout="image-right"
              image={"/projects/codedmrkdev.jpeg"}
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
              image={"/projects/retrycom.jpeg"}
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
              link={`https://retry.com`}
              heading={`erply.com`}
              content={`This is the main marketing website for the ERPLY. It consists of more than 1000 pages, the idea was to rebuild an old website and keep all the blog posts. First we have created a design of the main page, custom templates for different types of pages, it consists of more than 10 templates overall. The website is built as a WordPress custom theme, built from scratch, with lots of integrations and customizations. I have worked on 3 custom plugins, used internally in the WordPress admin menu. Highly customizable website thanks to Advanced Custom Fields, pretty much 95% of the content is being connected to the admin panel, where it is possible to change all the content.`}
              title={"code.dmrk.dev"}
            />
          </div>
        </Wrapper>
      </section>
      <section id="contact-me" className="">
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
            <FormField
              as="input"
              type="text"
              name="name"
              placeholder="Name"
              className={clsx({
                "ring-emerald-600 focus:ring-emerald-600 ring-1": formData.name,
              })}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <FormField
              as="input"
              className={clsx({
                "ring-rose-600 ring-1 animate-pulse":
                  !emailValidation(formData.email) && formData.email,
                "ring-emerald-600 focus:ring-emerald-600 ring-1":
                  emailValidation(formData.email),
              })}
              type="text"
              name="email"
              placeholder="Contact Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
            <FormField
              as="textarea"
              name="message"
              className={clsx({
                "ring-emerald-600 focus:ring-emerald-600 ring-1":
                  formData.message,
              })}
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            {error && error}

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
