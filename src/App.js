import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import "./style/index.css";

function App() {
  let history = useHistory();
  let url = "https://api-frontend-test.brlogic.com/podcast/details.json";

  const [Podname, setPodName] = useState();
  const [PodDescription, setPodDescription] = useState();
  const [coverMenu, setCoverMenu] = useState();
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPodName(data.name);
        setPodDescription(data.description);
        setCoverMenu(data.cover);
        setEpisodes(data.episodes);
        console.log(data.episodes);
      });
  }, []);

  var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundSize: "cover",
    backgroundImage: `url(${coverMenu})`
  };

  return (
    <div className="App">
      <div className="Podcast">
        <div className="Capa" style={sectionStyle}>
          <h1 className="PodTitle">{Podname}</h1>
          <h3 className="Ep-Length">{episodes.length} episódios</h3>
        </div>
        <div className="lista-pod">
          <div className="englob">
          <h4 className="eps">Lista de episódios</h4>
          {episodes.map((episode, index) => {
            return (
              <div className="ep-box" key={index} onClick={()=>{
                history.push(`/${episode.id}`)
              }}>
                <div className="coverEP">
                  <img src={episode.cover} alt="coverEP" />
                </div>
                <div className="Info-pod">
                  <h3 className="title-pod">
                    Ep. {episode.episodeNumber} - {episode.name}
                  </h3>
                  <p>
                    {Math.floor(episode.duration / 60)}:
                    {episode.duration - Math.floor(episode.duration / 60) * 60}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
