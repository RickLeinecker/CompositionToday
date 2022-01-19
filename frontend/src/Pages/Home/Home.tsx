import React, { useState } from "react";
import useLogout from "../../Helper/CustomHooks/useLogout";
import { Button, Image } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import TopNavBar from "../TopNavBar";
import "./stylesForPlayer.css";

import Waveform from "./Waveform";
import PlayList from "./Playlist";

const tracks = [
  {
    id: 0,
    title: "COMP TODAY!!!!!!!!",
    url: "userFile-1642368746216.mp3",
  },
  {
    id: 1,
    title: "Song 2!!!",
    url: "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
  },
];

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const { handleLogout } = useLogout();

  return (
    <>
      <TopNavBar />
      <div>
        Homepage
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
        <form
          id="uploadForm"
          encType="multipart/form-data"
          action="http://compositiontoday.net/api/upload"
          method="post"
        >
          <input type="file" name="userFile" />
          <input type="submit" value="Upload File" name="submit" />
          <Image
            className={"d-inline-block align-top me-2"}
            src="http://compositiontoday.net/images/userFile-1642373360276.jpg"
            width="400vw"
            height="400vh"
          />
        </form>
        <ReactAudioPlayer
          src="http://compositiontoday.net/audio/userFile-1642368746216.mp3"
          autoPlay
          controls
        />
        <Waveform url={selectedTrack.url} />
        <PlayList
          tracks={tracks}
          selectedTrack={selectedTrack}
          setSelectedTrack={setSelectedTrack}
        />
      </div>
    </>
  );
}
