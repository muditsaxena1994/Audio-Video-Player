import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";
import InputSlider from "./InputSlider";
import { secondsToMinutes } from "../utils";

function Player({ src }) {
  const isAudio = [".wav", ".mp3"].some((ext) => src.endsWith(ext));
  const isVideo = src.endsWith(".mp4");

  // State
  const audioPlayer = useRef(null);
  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [buffering, setBuffering] = useState(false);

  const player = isAudio ? audioPlayer : videoPlayer;

  //   Effects
  useEffect(() => {
    if (player?.current?.duration) {
      setDuration(player.current.duration);
    }
  }, [player?.current?.loadedmetadata, player?.current?.readyState]);

  //   Handlers
  const handlePlay = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      player?.current?.pause();
    } else {
      player?.current?.play();
    }
  };

  const handleCurrentTime = (event) => {
    if (event?.target?.currentTime) {
      setCurrentTime(event.target.currentTime);
    }
  };

  const handleManualJump = (time) => {
    if (player?.current) {
      player.current.currentTime = time;
      //   if (!isPlaying) {
      //     player?.current?.play();
      //   }
    }
  };

  const handleForward = () => {
    if (player?.current) {
      const time = player.current.currentTime;
      if (player.current.currentTime + 10 > duration) {
        player.current.currentTime = duration;
      } else {
        player.current.currentTime = time + 10;
      }
    }
  };

  const handleBackwards = () => {
    if (player?.current) {
      const time = player.current.currentTime;
      if (player.current.currentTime - 10 < 0) {
        player.current.currentTime = 0;
      } else {
        player.current.currentTime = time - 10;
      }
    }
  };

  const handlePlaybackRate = (event) => {
    if (player?.current) {
      const numberValue = parseFloat(event.target.value);
      player.current.playbackRate = numberValue;
    }
  };

  const handleVolume = (value) => {
    if (player?.current) {
      setVolume(value);
      setMute(!mute);
      player.current.volume = value;
    }
  };

  const handleMuteUnmute = () => {
    setMute(!mute);

    if (mute) {
      handleVolume(1);
    } else {
      handleVolume(0);
    }
  };

  // Values

  const prettyCurrentTime = secondsToMinutes(currentTime || 0);
  const prettyDuration = secondsToMinutes(duration || 0);

  return (
    <div className="flex flex-1 flex-col p-4 gap-4">
      <div className="flex flex-col h-[500] w-[900] relative">
        {isVideo && (
          <video
            src={src}
            ref={player}
            preload="metadata"
            onTimeUpdate={handleCurrentTime}
            onEnded={() => setIsPlaying(false)}
            onPlaying={() => setBuffering(false)}
            onWaiting={() => setBuffering(true)}
          />
        )}
        {isAudio && (
          <audio
            src={src}
            ref={player}
            className="hidden"
            preload="metadata"
            onTimeUpdate={handleCurrentTime}
            onEnded={() => setIsPlaying(false)}
            onPlaying={() => setBuffering(false)}
            onWaiting={() => setBuffering(true)}
          />
        )}

        {buffering && (
          <div className="absolute h-full w-full flex justify-center items-center">
            <div class="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500" />
          </div>
        )}
      </div>

      <div className="flex border-t pt-4">
        <div className="flex gap-4 items-center">
          {/* <button>
          <GiPreviousButton size={25} />
        </button> */}
          <button onClick={handleBackwards}>
            <TbRewindBackward10 size={25} />
          </button>
          <button onClick={handlePlay}>
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
          <button onClick={handleForward}>
            <TbRewindForward10 size={25} />
          </button>
          {/* <button>
          <GiNextButton size={25} />
        </button> */}
        </div>

        <div className="flex-1 flex items-center mx-4">
          <span className="w-10">{prettyCurrentTime}</span>

          <InputSlider
            min={0}
            step={1}
            value={currentTime}
            max={Math.floor(duration)}
            onChange={handleManualJump}
          />

          <span className="w-10">{prettyDuration}</span>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={handleMuteUnmute}>
            {!mute ? <IoVolumeHigh size={25} /> : <IoVolumeMute size={25} />}
          </button>

          <InputSlider
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolume}
          />

          <select
            defaultValue={1}
            name="Playback Speed"
            onChange={handlePlaybackRate}
          >
            <option value="0.25">x 0.25</option>
            <option value="0.50">x 0.50</option>
            <option value="1">x 1</option>
            <option value="1.25">x 1.25</option>
            <option value="1.50">x 1.50</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Player;
