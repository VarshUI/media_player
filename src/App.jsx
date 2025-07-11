import './App.css';
import React from 'react';
import VideoJS from './components/videojs';

function App() {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://ik.imagekit.io/varsh98bm/videoplayback.mp4?updatedAt=1752264115596",
        type: 'video/mp4',
      },
    ],
    poster:"https://ik.imagekit.io/varsh98bm/littlekrishna.jpeg?updatedAt=1752257321352",
    tracks: [
      {
        kind: 'captions',
        src: 'subtitles.vtt', // ⬅️ Replace with your own .vtt file later
        srcLang: 'en',
        label: 'English',
        default: true,
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <div>
      <h1>Hello</h1>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}

export default App;
