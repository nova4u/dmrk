import { NextPage } from "next";
import { About, Hero, Projects, Contact } from "@components/Sections";

const Index: NextPage = ({}) => {
  return (
    <>
      <Hero />
      <About img="/denismarushchak.jpg" />
      <Projects />
      <Contact />
    </>
  );
};

export default Index;
