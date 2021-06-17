import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaPlay, FaStop, FaVolumeMute, FaPause } from "react-icons/fa";
import Sound from "react-sound";
import { ProgressBar, Button } from "react-bootstrap";

const Episode = () => {
  const { id } = useParams();
  let history = useHistory();

  let url = `https://api-frontend-test.brlogic.com/podcast/episodes/${id}/details.json`;

  const [cover, setCover] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [audio, setAudio] = useState();
  const [participants, setParticipants] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const [playing, setPlaying] = useState(Sound.status.PAUSED);
  const [vol, setVol] = useState(100);

  const [trackProgress, setTrackProgress] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCover(data.cover);
        setName(data.name);
        setDescription(data.description);
        setAudio(data.audio);
        setParticipants(data.participants);
        setEpisodeNumber(data.episodeNumber);
        console.log(data.audio);
      });
  }, []);

  var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundSize: "cover",
    backgroundImage: `url(${cover})`,
  };

  function muteBtn() {
    setVol(0);
    console.log("Mutado");
  }

  function playBtn() {
    console.log("Play");
    setPlaying(Sound.status.PLAYING);
    setIsPlaying(true);
  }

  function pauseBtn() {
    console.log("Pause");
    setPlaying(Sound.status.PAUSED);
    setIsPlaying(false);
  }

  function stopBtn() {
    setPlaying(Sound.status.STOPPED);
    setIsPlaying(false);
    console.log("Stop");
  }

  return (
    <div className="App-EP">
      <div className="Capa-EP" style={sectionStyle}>
        <button
          className="btn-close"
          onClick={() => {
            history.push("/");
          }}
        >
          <MdClose className="icon-close" />
        </button>
      </div>
      <div>
        <ProgressBar className="progresss" variant="success" now={50} />
      </div>
      <div className="pod-info">
        <h3 className="pod-title">
          Episódio {episodeNumber} - {name}
        </h3>

        <p>{description}</p>

        <p className="participants">Participante: {participants[0]}</p>
      </div>

      <div className="player">
        <div className="Buttons">
          <button onClick={muteBtn} className="mute-btn p-btn">
            <FaVolumeMute />
          </button>
          {isPlaying ? (
            <button onClick={pauseBtn} className="play-btn">
              <FaPause className="play-btt" />
            </button>
          ) : (
            <button onClick={playBtn} className="play-btn">
              <FaPlay className="play-btt" />
            </button>
          )}
          <button onClick={stopBtn} className="stop-btn p-btn">
            <FaStop />
          </button>
        </div>

        <Sound url={audio} playStatus={playing} volume={vol} />
      </div>
    </div>
  );
};

export default Episode;
