import { useState } from "react";
import axios from "axios";
import { FETCH } from "../FETCH";

const SongRequestForm = () => {
  const [data, setData] = useState({
    name: "",
    artist: "",
    countVote: null,
  });

  const changeName = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const changeArtist = (e) => {
    setData({ ...data, artist: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${FETCH}/currentSongs`, {
        ...data,
        countVote: 0,
        unavailable: "false",
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(data.name);
  return (
    <div className="max-w-lg mx-auto lg:max-w-none">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col justify-center items-center space-y-4"
      >
        <div className="flex space-x-4">
          <div>
            <label htmlFor="full_name" className="sr-only">
              Titre
            </label>
            <input
              type="text"
              name="Titre"
              id="Titre"
              autoComplete="Titre"
              className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              placeholder="Titre"
              onChange={(e) => changeName(e)}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Artiste
            </label>
            <input
              id="Artiste"
              name="Artiste"
              type="Artiste"
              autoComplete="Artiste"
              className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-400 rounded-md"
              placeholder="Artiste"
              onChange={(e) => changeArtist(e)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongRequestForm;
