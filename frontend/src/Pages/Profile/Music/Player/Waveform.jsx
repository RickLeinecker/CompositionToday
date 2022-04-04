import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

import DefaultValues from "../../../../Styles/DefaultValues.module.scss"
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import './Waveform.scss'

const formWaveSurferOptions = ref => ({
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
  //   mode: "cors",
  //   method: "GET",
  //   credentials: "include",
  //   headers: [
  //     { key: "cache-control", value: "no-cache" },
  //     { key: "pragma", value: "no-cache" },
  //   ],
  // },
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

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
      <div className="controls">
        {!playing ? <PlayCircleIcon style={{ fontSize: "3rem" }} onClick={handlePlayPause}></PlayCircleIcon> : <PauseCircleIcon style={{ fontSize: "3rem" }} onClick={handlePlayPause}></PauseCircleIcon>}
      </div>
    </div>
  );
}
