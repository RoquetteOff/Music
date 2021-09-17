import React from "react";
import SongRequestBloc from "../components/songRequestBloc.jsx";
import MusicBandeau from "../assets/musicbandeau.jpg";

const image = MusicBandeau;

const songRequest = () => {
  return (
    <div className="bg-gray-50">
      <div className="relative h-40">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src={image} alt="" />
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

export default songRequest;
