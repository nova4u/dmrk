import { FC } from "react";
import { default as NextImage } from "next/image";
import { Wrapper } from "@dmrk/ui";
import { Heading, Background } from "@components/index";

interface AboutProps {
  img: string;
}

const About: FC<AboutProps> = ({ img }) => {
  return (
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
        <div className="relative mx-auto w-fit gradient-box rounded-md lg:mx-0 group ">
          <NextImage
            sizes={"33vw"}
            src={img}
            quality={100}
            width={460}
            height={614}
            className="rounded-lg  object-cover mt-10 lg:mt-0 relative z-10 transition lg:max-h-full"
            alt="Denis Marushchak photo"
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default About;
