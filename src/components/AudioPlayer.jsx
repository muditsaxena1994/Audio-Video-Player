import { useState } from "react";
import Player from "./Player";
import clsx from "clsx";

const URLS = [
  {
    sources:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

    title: "Big Buck Bunny",
  },
  {
    sources:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",

    title: "Elephant Dream",
  },
  {
    sources:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",

    title: "For Bigger Blazes",
  },
  {
    sources:
      "https://dl.musopen.org/recordings/0d2b20df-6ba6-46c9-b058-62f5e7976cb0.mp3?filename=Cello+Suite+no.+1+-+Prelude+in+G%2C+BWV+1007.mp3",

    title: "Cello Suite no. 1 - Prelude in G, BWV 1007",
  },
  {
    sources:
      "https://dl.musopen.org/recordings/f5f83183-a71b-462c-bd89-6557159570e4.mp3?filename=Sung+Oribe+-+Prelude+from+Cello+suite+no.+1.mp3",

    title: "Sung Oribe - Prelude from Cello suite no. 1",
  },
];

function AudioPlayer() {
  const [currentUrl, setCurrenUrl] = useState(URLS[0]);

  return (
    <div className="flex border m-4 w-3/4 mx-auto p-4 rounded-lg">
      <div className="flex items-end flex-1">
        <Player src={currentUrl.sources} key={currentUrl.sources} />
      </div>

      <ul className="w-[200px] border-l p-4">
        {URLS.map((url, index) => (
          <li
            key={url.sources}
            onClick={() => setCurrenUrl(url)}
            className={clsx(
              currentUrl.sources === url.sources && "bg-slate-400",
              "cursor-pointer hover:bg-slate-200 p-2"
            )}
          >
            {url.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AudioPlayer;
