import React from "react";
import MusicIcon from "../assets/music.svg";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <img src="Logo.png" className="h-[24px] w-auto" />
      <div>
        <p className="text-white font-gilroy tracking-wide font-bold">About us</p>
      </div>
      <img src={MusicIcon} className="h-[24px] w-auto stroke-white" />
    </div>
  );
};

export default Header;
