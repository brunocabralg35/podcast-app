import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FaPlay, FaStop, FaVolumeMute } from "react-icons/fa";
import ReactAudioPlayer from 'react-audio-player';

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

  return (
    <div className="App-EP">
      <div className="Capa-EP" style={sectionStyle}>
        <button
          className="btn-close"
          onClick={() => {
            history.push("/");
          }}
        >
          <MdClose className="icon-close"/></button>
      </div>

      <div className="pod-info">
        <h3 className="pod-title">
          Episódio {episodeNumber} - {name}
        </h3>

        <p>{description}</p>

        <p className="participants">Participante: {participants[0]}</p>
      </div>

      <div className="player">
        <button className="mute-btn p-btn"><FaVolumeMute/></button>
        <button className="play-btn"><FaPlay className="play-btt"/></button>
        <button className="stop-btn p-btn"><FaStop/></button>
        <ReactAudioPlayer src={audio}/>
      </div>
    </div>
  );
};

export default Episode;
