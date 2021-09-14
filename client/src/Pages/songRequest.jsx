import React from "react";
import SongRequestBloc from '../components/songRequestBloc.jsx'


const image =
  "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100";

const songRequest = () => {
  return (
    <div className="bg-gray-50">
      
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src={image} alt="" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get in touch
          </h1>
        </div>
      </div>
      <SongRequestBloc />
    </div>
  );
};

export default songRequest;
