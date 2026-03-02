import AudioVisualizer from "./AudioVisualizer";
import { GiPineTree } from "react-icons/gi";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <GiPineTree color="white" size={"40px"} />
      <div>
        <p className="text-white font-gilroy tracking-wide font-bold">About us</p>
      </div>
      <div>
      {/* omit `audioSrc` to let the visualizer pick a free track from a public API */}
      <AudioVisualizer audioSrc="/nature_music.mp3" width={130} height={35} />
      </div>
    </div>
  );
};

export default Header;
