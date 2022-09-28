import React, { KeyboardEvent } from "react";
import Head from "next/head";
import { NextPage } from "next";
import {
  Wrapper,
  Panel,
  Switch,
  Menu,
  Typography,
  Button,
  Navbar,
} from "@dmrk/ui";
import { Settings, Text } from "@dmrk/ui/icons";
import { CodeEditor } from "../components/";
import CodeSettings from "../../settings.json";
import ImageConverter from "@lib/ImageConverter";

const { languages, fontFamily, fontSizes, headlines } = CodeSettings;

export const Docs: NextPage = () => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [search, setSearch] = React.useState("");
  const [isLangMenuOpen, setIsLangMenuOpen] = React.useState(false);
  const [noise, setNoise] = React.useState(false);
  const [language, setLanguage] = React.useState<string>(`TSX`);
  const [font, setFont] = React.useState<number>(0);
  const [fontSize, setFontSize] = React.useState<string>(fontSizes[2]);
  const codeRef = React.useRef<HTMLDivElement>(null);

  const handleFontChange = (i: number, option: string) => {
    const fontHasBeenPreloaded = !fontFamily[i].url;
    if (fontHasBeenPreloaded) {
      return setFont(i);
    }

    const fontAlreadyLoaded = document.fonts.check(`12px ${option}`);

    if (fontAlreadyLoaded) return setFont(i);

    new FontFace(option, `url(${fontFamily[i].url})`, {
      style: "normal",
      weight: "100 900",
      display: "swap",
    })
      .load()
      .then((font) => {
        document.fonts.add(font);
        setFont(i);
      })
      .catch((e) => console.log(e));
  };

  const filteredLanguageList = React.useMemo(
    () =>
      languages.filter((lang) =>
        lang.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const downloadAsPng = React.useCallback(async () => {
    if (!codeRef.current) return;
    await ImageConverter.generate(
      {
        format: "png",
        font: fontFamily[font].name,
        download: true,
        copyToClipboard: false,
      },
      codeRef.current
    );
  }, [font]);

  const copyToClipboard = React.useCallback(async () => {
    if (!codeRef.current) return;
    await ImageConverter.generate(
      {
        format: "png",
        font: fontFamily[font].name,
        download: false,
        copyToClipboard: true,
      },
      codeRef.current
    );
  }, [font]);

  const downloadAsSvg = React.useCallback(async () => {
    if (!codeRef.current) return;
    await ImageConverter.generate(
      {
        format: "svg",
        font: fontFamily[font].name,
        download: true,
        copyToClipboard: false,
      },
      codeRef.current
    );
  }, [font]);

  const handleSearchKeyDown = (e: KeyboardEvent) => {
    const isFilteredToSingle = filteredLanguageList.length === 1;

    if (e.code === "Enter" && isFilteredToSingle) {
      setLanguage(filteredLanguageList[0]);
      const target = e.target as HTMLInputElement;
      target.blur();
      setIsLangMenuOpen(false);
      setSearch(filteredLanguageList[0]);
    }
  };

  return (
    <Wrapper className="py-14 relative overflow-hidden">
      <Seo />
      <Navbar className="" />
      <Circle className="top-0 left-1/2 absolute -translate-x-1/2 animate-pulse -z-10" />
      <Typography className="mb-20" as="h1">
        {headlines[0]}
      </Typography>
      <CodeEditor
        ref={codeRef}
        language={language}
        font={fontFamily[font].name}
        fontSize={fontSize}
        noise={noise}
        className="p-6 max-w-2xl"
      />
      <Panel
        className="mt-20 fixed max-w-screen-lg mx-auto  bg-neutral-800 rounded-lg border border-white/10 text-neutral-100 px-6  py-2.5 gap-2 md:gap-6"
        ref={panelRef}
      >
        <Switch label={"Noise"} checked={noise} setChecked={setNoise} />
        <Menu
          active={languages.findIndex((option) => option === language)}
          onSelect={(_, option) => {
            const selectedOption = languages.find((item) => item === option);
            if (!selectedOption) return;
            setLanguage(selectedOption);
            setSearch(selectedOption);
          }}
          closeOnClick
          showLabel
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          controller={{
            open: isLangMenuOpen,
            setOpen: setIsLangMenuOpen,
          }}
          label={(props) => (
            <input
              type="text"
              placeholder={language}
              className="bg-transparent placeholder:text-slate-100 focus:placeholder-transparent"
              onChange={(e) => {
                setIsLangMenuOpen(true);
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => handleSearchKeyDown(e)}
              onFocus={() => setSearch("")}
              value={search}
              {...props}
            />
          )}
          icon={<Settings className="w-5 h-5 mr-2 flex-shrink-0" />}
          options={filteredLanguageList}
          size="md"
        />
        <Menu
          active={font}
          onSelect={(i, option) =>
            typeof option === "string" && handleFontChange(i, option)
          }
          closeOnClick
          showLabel={true}
          options={fontFamily.map((font) => font.name)}
          icon={<Text className="w-5 h-5 mr-2 flex-shrink-0" />}
          size="auto"
        />
        <Menu
          active={fontSizes.findIndex((option) => option === fontSize)}
          onSelect={(i) => setFontSize(fontSizes[i])}
          closeOnClick
          showLabel={true}
          options={fontSizes}
          // icon={<Text className="w-5 h-5 mr-2 flex-shrink-0" />}
          size="auto"
        />
        <Menu
          openOnMouseOver
          containerClasses={`ml-auto`}
          className="ml-auto"
          showLabel={true}
          label={(props) => (
            <Button variant="outline" className="" {...props}>
              Export
            </Button>
          )}
          options={[
            {
              el: (data) => (
                <button
                  onClick={downloadAsSvg}
                  className="py-1 px-3    rounded-md transition hover:text-emerald-500 block  hocus:text-emerald-500 hocus:outline-none hocus:ring-1  hocus:ring-emerald-500 "
                  {...data}
                >
                  Export as SVG
                </button>
              ),
            },
            {
              el: (data) => (
                <button
                  onClick={downloadAsPng}
                  className={`py-1 px-3    rounded-md transition hover:text-emerald-500 block  hocus:text-emerald-500 hocus:outline-none hocus:ring-1  hocus:ring-emerald-500 `}
                  {...data}
                >
                  Export as PNG
                </button>
              ),
            },
            {
              el: (data) => (
                <button
                  onClick={copyToClipboard}
                  className={`py-1 px-3    rounded-md transition hover:text-emerald-500 block  hocus:text-emerald-500 hocus:outline-none hocus:ring-1  hocus:ring-emerald-500 `}
                  {...data}
                >
                  Copy to Clipboard
                </button>
              ),
            },
          ]}
          size="auto"
        />
      </Panel>
    </Wrapper>
  );
};

const Seo: React.FC<{}> = () => {
  return (
    <Head>
      <title>Code ScreenShot Generator | @dmrk</title>
      <meta
        name="description"
        content="Generate code screenshots on the fly."
      />
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export default Docs;

interface CircleProps extends React.SVGProps<SVGSVGElement> {}

const Circle = ({ className, ...rest }: CircleProps) => {
  return (
    <svg
      width="527"
      height="430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
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
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
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
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            stdDeviation="56.938"
            result="effect1_foregroundBlur_27_138"
          />
        </filter>
      </defs>
    </svg>
  );
};
