import { useState, useEffect } from "react";
import axios from "axios";
import { FETCH } from "../FETCH";

export default function SongRequestInCurrent(props) {
  // Hook pour le rendu du composant
  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();
  
  // Fonction pour désactivé le vote
  const votingDisable = (id) => {
    let idVoting = localStorage.getItem("idMusicVoting");
    if (idVoting !== null) {
      return idVoting.includes(id);
    } else {
      return false;
    }
  };

  const handleVote = (id, count) => {
    let newCount = parseInt(count) + 1;
    axios
      .put(`${FETCH}/currentSongs/${id}`, {
        countVote: newCount,
      })
      .then((result, err) => {
        if (
          localStorage.getItem("idMusicVoting") === null &&
          localStorage.getItem("date") === null
        ) {
          localStorage.setItem("idMusicVoting", id);
        } else {
          let oldId = localStorage.getItem("idMusicVoting");
          if (oldId !== null) {
            let result = oldId.split(",");
            result.push(id);
            localStorage.removeItem("idMusicVoting");
            localStorage.setItem("idMusicVoting", result);
          }
        }
      });
    forceUpdate();
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {props.isLoading
          ? props.songs
              .sort((a, b) =>
                a.countVote > b.countVote
                  ? -1
                  : b.countVote > a.countVote
                  ? 1
                  : 0
              )
              .map((song) => (
                <li key={song.id}>
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                        <p className="capitalize text-sm font-medium text-gray-800 md:col-span-3">
                          {song.name} - {song.artist}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
                        <p className="capitalize text-sm font-medium text-gray-500 truncate">
                          Vote: {song.countVote}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                        {song.unavailable === "false" ? (
                          votingDisable(song.id) ? (
                            <div className="col-start-2 col-span-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-400 bg-gray-100">
                              Voté!
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleVote(song.id, song.countVote)
                              }
                              type="button"
                              className="col-start-2 col-span-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Voter
                            </button>
                          )
                        ) : (
                          <div className="col-start-2 col-span-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-400 bg-gray-100">
                            <div>Indiponible!</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
          : null}
      </ul>
    </div>
  );
}
