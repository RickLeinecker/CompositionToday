import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

import DefaultValues from "../../../../Styles/DefaultValues.module.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import moment from "moment";
import "./Waveform.scss";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: DefaultValues.primaryColor,
  cursorColor: DefaultValues.primaryColor,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 150,
  // backend: "MediaElement",
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  // xhr: {
  //   cache: "default",
  //   mode: "no-cors",
  //   method: "GET",
  //   credentials: "same-origin",
  //   redirect: "follow",
  //   referrer: "client",
  //   headers: [{ key: "Authorization", value: "my-token" }],
  // },
  xhr: {
    cache: "default",
    mode: "cors",
    method: "GET",
    credentials: "include",
    headers: [
      { key: "cache-control", value: "no-cache" },
      { key: "pragma", value: "no-cache" },
    ],
  },
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    // const myAudio = new Audio(url);
    // myAudio.crossOrigin = "anonymous";

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);
      setTotalTime(Math.round(wavesurfer.current.getDuration() * 1000));
    });

    wavesurfer.current.on("audioprocess", function () {
      if (wavesurfer.current.isPlaying()) {
        var currentTime = wavesurfer.current.getCurrentTime();
        setCurrentTime(Math.round(currentTime * 1000));
      }
    });

    wavesurfer.current.on("finish", function () {
      wavesurfer.current.stop();
      setCurrentTime(0);
      setPlay(false);
    });

    // wavesurfer.current.on('interaction', function () {

    //   var currentTime = wavesurfer.current.getCurrentTime();
    //   setCurrentTime(Math.round(currentTime * 1000));
    // });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div>
          <p style={{ margin: "0" }}>
            {moment(currentTime).format("mm:ss") +
              "/" +
              moment(totalTime).format("mm:ss")}{" "}
          </p>
        </div>
        <div className="controls">
          {!playing ? (
            <PlayCircleIcon
              style={{ fontSize: "3rem" }}
              onClick={handlePlayPause}
            ></PlayCircleIcon>
          ) : (
            <PauseCircleIcon
              style={{ fontSize: "3rem" }}
              onClick={handlePlayPause}
            ></PauseCircleIcon>
          )}
        </div>
      </div>
    </div>
  );
}
