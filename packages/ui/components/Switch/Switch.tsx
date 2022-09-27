import React, { FC } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps {
  label: string;
  checked: boolean;
  setChecked: (v: boolean) => void;
}

const Switch: FC<SwitchProps> = ({ label, checked, setChecked }) => {
  return (
    <div className="flex items-center">
      <SwitchPrimitive.Root
        className="appearance-none w-8 h-5 md:h-6 md:w-12  bg-neutral-900 rounded-full relative hocus:outline-none hocus:ring-white-600 hocus:ring-2 pl-1 py-0.5 ring-0.5 ring-white/20 transition [&[data-state='checked']]:bg-emerald-600"
        checked={checked}
        onCheckedChange={(v) => setChecked(v)}
      >
        <SwitchPrimitive.Thumb
          id="s1"
          className="[&[data-state='checked']]:translate-x-3 md:[&[data-state='checked']]:translate-x-6 [&[data-state='checked']]:bg-neutral-100 bg-white rounded-full w-3 h-3 md:w-4 md:h-4 block transition ease-out"
        />
      </SwitchPrimitive.Root>
      <label
        htmlFor="s1"
        className="select-none leading-none text-neutral-50  ml-2 text-xs md:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

export default Switch;
