import React, { FC } from "react";
import dynamic from "next/dynamic";
import colors from "tailwindcss/colors";
import clsx from "clsx";
import "@uiw/react-textarea-code-editor/dist.css";

interface CodeEditorProps {
  language: string;
  fontSize: string;
  noise: boolean;
  font?: string;
  className?: string;
}

const EditorTheme: { [key: string]: string } = {
  "--color-prettylights-syntax-entity": colors.slate[200],
  "--color-prettylights-syntax-entity-tag": colors.cyan[500],
  "--color-prettylights-syntax-constant": colors.emerald[400],
  "--color-canvas-subtle": "rgba(23, 23, 23, 0.7)",
  "--color-fg-default": colors.slate[50],
  "--color-prettylights-syntax-comment": colors.gray[400],
  "--color-prettylights-syntax-markup-bold": colors.violet[300],
  "--color-prettylights-syntax-sublimelinter-gutter-mark": colors.cyan[500],
  "--color-prettylights-syntax-string": colors.violet[400],
  "--color-prettylights-syntax-keyword": colors.sky[400],
};

const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  ({ language, noise, font, fontSize, className }, ref) => {
    const [code, setCode] = React.useState(
      `function add(a: number, b: number) {\n  return a + b;\n}`
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const [title, setTitle] = React.useState(`Untitled`);

    const AreaCodeEditor = React.useMemo(
      () =>
        dynamic(
          () =>
            import("@uiw/react-textarea-code-editor").then((mod) => {
              setIsLoading(false);
              return mod.default;
            }),
          { ssr: false }
        ),
      []
    );

    if (isLoading)
      return (
        <>
          <span className="loader mt-20 mx-auto"></span>
          <AreaCodeEditor />
        </>
      );

    return (
      <div className="w-auto relative mx-auto flex justify-center">
        <div
          className={clsx(
            className,
            "bg-gradient-to-r rounded-lg from-emerald-600 to-green-600  w-full relative overflow-hidden"
          )}
          style={{
            fontFamily: `${
              font || "JetBrains Mono"
            }, ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace`,
          }}
          ref={ref}
        >
          {noise && (
            <NoiseTexture className="absolute top-0 left-0 -z-0 w-full h-full opacity-40 bg-emerald-600 " />
          )}

          <div
            className={clsx(
              "h-8 bg-neutral-900/70 rounded-tl-lg rounded-tr-lg grid grid-cols-[100px_1fr_100px]  items-center pl-4 relative"
            )}
          >
            <div className="space-x-2 flex">
              <span className="h-2.5 w-2.5 block rounded-lg bg-zinc-500 hover:bg-zinc-200 transition"></span>
              <span className="h-2.5 w-2.5 block rounded-lg bg-zinc-500 hover:bg-zinc-200 transition"></span>
              <span className="h-2.5 w-2.5 block rounded-lg bg-zinc-500 hover:bg-zinc-200 transition"></span>
            </div>
            <input
              className="block bg-transparent  focus:outline-none text-center text-xs focus:text-slate-50 text-slate-300 tracking-wider "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <AreaCodeEditor
            value={code}
            language={language}
            className="rounded-br-lg rounded-bl-lg w-full border border-emerald-50/5 shadow-2xl  tracking-wide bg-neutral-500"
            placeholder="Please enter JS code."
            onChange={(evn) => setCode(evn.target.value)}
            padding={16}
            style={
              {
                ...EditorTheme,

                fontSize,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;

const NoiseTexture: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg id="texture" className={className}>
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".4"
          numOctaves="40"
          stitchTiles="stitch"
        ></feTurbulence>
        <feColorMatrix type="saturate" values="1"></feColorMatrix>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)"></rect>
    </svg>
  );
};
