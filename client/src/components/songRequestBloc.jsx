import SongRequestForm from "./songRequestForm";
import SongRequestInCurrent from "./songRequestInCurrent";
import { useState, useEffect } from "react";
import axios from "axios";
import { FETCH } from "../FETCH";

/* This example requires Tailwind CSS v2.0+ */
export default function SongRequestBloc() {
  // useState
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //Fecth liste de musique
  useEffect(() => {
    axios
      .get(`${FETCH}/currentSongs`)
      .then((res) => {
        setSongs(res.data);
        setLoading(true);
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  });

  const sortSongs = () => {
    let test = songs.sort((a, b) =>
      a.countVote > b.countVote ? -1 : b.countVote > a.countVote ? 1 : 0
    );
    return test;
  };

  return (
    <div className="pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10  lg:rounded-md bg-white shadow">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Titre en cours
          </h3>
        </div>
        <div className="bg-white py-8 px-4 sm:px-6 lg:col-span-3  lg:px-8 xl:pl-12">
          <SongRequestForm songs={songs} />
        </div>
        <SongRequestInCurrent isLoading={isLoading} songs={sortSongs()} />
      </div>
    </div>
  );
}
