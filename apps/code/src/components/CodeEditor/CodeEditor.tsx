import React, { FC } from "react";

interface CodeEditorProps {}

const CodeEditor: FC<CodeEditorProps> = ({}) => {
  return (
    <div className="bg-neutral-700 rounded-lg border border-white/20 w-full  max-w-xl h-80 mx-auto mt-20 text-white flex items-center justify-center">
      <h2 className="text-5xl font-bold ">Code Placeholder</h2>
    </div>
  );
};

export default CodeEditor;
