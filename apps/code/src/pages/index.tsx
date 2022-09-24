import React from "react";
import {
  Wrapper,
  Logotype,
  Panel,
  Switch,
  Menu,
  Typography,
  Button,
} from "@dmrk/ui";
import Head from "next/head";
import { Settings, Text } from "@dmrk/ui/icons";
import { CodeEditor } from "@components/index";
import { NextPage } from "next";

const options = [
  "JavaScript",
  "TypeScript",
  "Rust",
  "GOLang",
  "Dart",
  "Swift",
  "C#",
  "C++",
  "JavaScript",
  "TypeScript",
  "Rust",
  "GOLang",
  "Dart",
  "Swift",
  "C#",
  "C++",
  "JavaScript",
  "TypeScript",
  "Rust",
  "GOLang",
  "Dart",
  "Swift",
  "C#",
  "C++",
];

const headlines = [
  "Make your code pop!",
  "Code has never been sexier",
  "Sometimes even code need some makeup",
  "Sharing your code has never been easier",
  "Even code wants to be pretty",
];

const fonts = ["Roboto", "JetBrains Mono"];

export const Docs: NextPage = () => {
  const [noise, setNoise] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(options[0]);
  const [font, setFont] = React.useState<number>(0);

  const handleExport = React.useCallback(() => {
    console.log("Start exporting...");
  }, []);

  return (
    <Wrapper className="py-14 relative overflow-hidden">
      <Seo />
      <Logotype></Logotype>
      <svg
        width="527"
        height="430"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="top-0 left-1/2 absolute -translate-x-1/2 animate-pulse"
        style={{}}
      >
        <g opacity=".1" filter="url(#a)">
          <circle cx="256.654" cy="172.81" r="70.609" fill="#10B981" />
        </g>
        <g opacity=".2" filter="url(#b)">
          <circle cx="263.226" cy="166.959" r="148.9" fill="#10B981" />
        </g>
        <circle
          opacity=".6"
          cx="263.226"
          cy="166.959"
          r="148.389"
          stroke="url(#c)"
          strokeWidth="1.022"
        />
        <circle
          opacity=".6"
          cx="268"
          cy="166.959"
          r="184.02"
          stroke="url(#d)"
          strokeWidth="1.267"
        />
        <defs>
          <linearGradient
            id="c"
            x1="263.226"
            y1="18.058"
            x2="263.226"
            y2="315.859"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFAB" />
            <stop offset="1" stopColor="#7C75EC" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="d"
            x1="268"
            y1="-17.695"
            x2="268"
            y2="351.612"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00FFAB" />
            <stop offset="1" stopColor="#7C75EC" stopOpacity="0" />
          </linearGradient>
          <filter
            id="a"
            x="132.044"
            y="48.201"
            width="249.218"
            height="249.218"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="27"
              result="effect1_foregroundBlur_27_138"
            />
          </filter>
          <filter
            id="b"
            x=".45"
            y="-95.817"
            width="525.551"
            height="525.551"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="56.938"
              result="effect1_foregroundBlur_27_138"
            />
          </filter>
        </defs>
      </svg>
      <Typography as="h1">{headlines[0]}</Typography>
      <Typography as="p">Language: {language}</Typography>
      <Typography as="p">Font: {fonts[font]}</Typography>
      <CodeEditor />
      <Panel className="mt-20 fixed max-w-screen-2xl text-neutral-100 justify-between">
        <div className="flex gap-6 flex-wrap">
          <Switch label={"Noise"} checked={noise} setChecked={setNoise} />
          <Menu
            active={options.findIndex((option) => option === language)}
            onSelect={(i) => setLanguage(options[i])}
            closeOnClick
            showLabel
            icon={<Settings className="w-5 h-5 mr-2 flex-shrink-0" />}
            options={options}
            size="md"
          />
          <Menu
            active={font}
            onSelect={(i) => setFont(i)}
            closeOnClick
            showLabel={false}
            options={fonts}
            icon={<Text className="w-5 h-5 mr-2 flex-shrink-0" />}
            size="auto"
          />
        </div>
        <Button variant="outline" onClick={handleExport} className="">
          Export
        </Button>
      </Panel>
    </Wrapper>
  );
};

const Seo: React.FC<{}> = () => {
  return (
    <Head>
      <title>Code ScreenShot Generator | @dmrk</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Docs;
