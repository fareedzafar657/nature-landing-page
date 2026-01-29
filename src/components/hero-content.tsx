import React from "react";

const HeroContent = () => {
  return (
    <div className="flex flex-col space-y-3 -translate-y-8">
      <div className="flex items-center space-x-2">
        <div className="w-[100px] bg-[#FBD784] h-[2px]" />
        <p className="font-gilroy text-[#FBD784] text-xl">
          Your daily escape to calm, beauty, and nature’s rhythm.
        </p>
      </div>
      <div className="text-center">
        <p className="font-eagle text-3xl md:text-5xl text-white leading-20">
          Where Every Sound &amp; Sight <br /> Rejuvenates You
        </p>
      </div>
    </div>
  );
};

export default HeroContent;
