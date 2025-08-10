import { ReactNode } from "react";

export default function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#57c2ff] via-[#83e3d2] to-[#b388ff] bg-clip-text text-transparent">
      {children}
    </span>
  );
}


