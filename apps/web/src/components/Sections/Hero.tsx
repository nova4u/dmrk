import React, { FC } from "react";
import { default as NextImage } from "next/image";
import { Navbar, Wrapper } from "@dmrk/ui";
import { Heading, Background } from "@components/index";
import Link from "next/link";
import { logos } from "@lib/data";

type Logo = {
  name: string;
  src: string;
  alt: string;
  width: number;
};

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
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
  );
};

export default Hero;
