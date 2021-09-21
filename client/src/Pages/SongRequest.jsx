import React from "react";
import SongRequestBloc from "../components/songRequestBloc.jsx";
import MusicBandeau from "../assets/musicbandeau.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { FETCH } from "../FETCH";

const SongRequest = () => {
  //Verification de la soirée
  const [event, setEvent] = useState();
  const [eventLoad, setEventLoad] = useState(false);

  useEffect(() => {
    axios
      .get(`${FETCH}/events`)
      .then((res) => {
        setEvent(res.data);
        setEventLoad(true);
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="relative h-40">
        <div className="absolute inset-0">
          {eventLoad ? (
            <img
              className="w-full h-full object-cover"
              src={
                event.length > 0 && event[0].bg_music !== null
                  ? `/uploads/${event[0].bg_music}`
                  : MusicBandeau
              }
              alt="banniere"
            />
          ) : null}
        </div>
        <div className="relative max-w-7xl mx-auto h-40  flex items-center sm:px-8 px-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Music Request
          </h1>
        </div>
      </div>
      <SongRequestBloc />
    </div>
  );
};

export default SongRequest;
