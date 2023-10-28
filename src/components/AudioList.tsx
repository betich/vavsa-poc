import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

function AudioList() {
  const {
    data: audioData,
    error,
    isLoading,
  } = useSWR<{ _id: string; songname: string }[]>(
    "https://api-ex4.vercel.app/audio",
    fetcher
  );

  const handleAudioClick = (filename: string) => {
    // Navigate to the audio detail page using React Router
    window.location.href = `/audio/${filename}`;
  };

  return (
    <div className="audio-list-container">
      <h1 className="audio-list-header">Spooky Audio Files</h1>
      <ul>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error loading audio files</div>}
        {audioData &&
          audioData.map((audio, index) => (
            <li
              key={index}
              onClick={() => handleAudioClick(audio.songname)}
              className="audio-item"
            >
              {audio.songname}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AudioList;
