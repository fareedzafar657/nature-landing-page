import AudioVisualizer from "./AudioVisualizer";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <img src="Logo.png" className="h-[24px] w-auto" />
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
