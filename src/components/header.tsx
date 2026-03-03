import { GiPineTree } from "react-icons/gi";
import MusicPlayer from "./music-player";

const sampleTracks = [
  {
    id: '1',
    title: 'Nature Vibes',
    imageUrl:
      'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    audioUrl:
      '/nature_music.mp3',
  },
  // {
  //   id: '2',
  //   title: 'Midnight Echo',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  //   audioUrl:
  //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  // },
  // {
  //   id: '3',
  //   title: 'Electric Dreams',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
  //   audioUrl:
  //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  // },
  // {
  //   id: '4',
  //   title: 'Neon Nights',
  //   imageUrl:
  //     'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
  //   audioUrl:
  //     'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  // },
];

const Header = () => {
  return (
    <div className="flex items-start justify-between">
      <GiPineTree color="white" size={"40px"} />
      <div>
         <MusicPlayer
              tracks={sampleTracks}
              layout="horizontal"
              size="small"
              showControls={false}
              backgroundStyle="transparent"
              onlyCD={true}
            />
      </div>
    </div>
  );
};

export default Header;
