import React from "react";
import { ArrowRight } from "lucide-react";

const HomeSectionButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-[#2a003f] font-semibold px-6 py-3 flex items-center gap-2 rounded shadow hover:scale-105 transition"
    >
      {children}
      <ArrowRight size={18} />
    </button>
  );
};

export default HomeSectionButton;
