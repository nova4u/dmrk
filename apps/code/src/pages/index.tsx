import React, { useState } from "react";
import { Button, Wrapper } from "@dmrk/ui";
import { NextPage } from "next";

export const Docs: NextPage = () => {
  return (
    <Wrapper className="py-14">
      <h1 className="font-semibold text-6xl text-neutral-800 text-center tracking-tight">
        Turborepo starter
      </h1>
      <Button className="mt-8 block mx-auto">+ TailwindCSS</Button>
    </Wrapper>
  );
};

export default Docs;
