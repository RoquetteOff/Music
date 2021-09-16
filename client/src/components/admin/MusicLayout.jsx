import { useEffect, useState } from "react";
import axios from "axios";
import { FETCH } from "../../FETCH";
import { BsFillTrashFill } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MusicLayout = () => {
  const token = localStorage.getItem("token");

  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //Fecth liste de musique
  const fetchData = () => {
    axios
      .get(`${FETCH}/currentSongs`)
      .then((res) => {
        setSongs(res.data);
        setLoading(true);
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  };

  // Suppression de la musique
  const handleDeleteMusic = (id) => {
    MySwal.fire({
      title: `Êtes-vous sûr de vouloir supprimer cette chanson?`,
      showCancelButton: true,
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${FETCH}/currentsongs/${id}`, {
            headers: {
              "x-access-token": token,
            },
          })
          .then(() => {
            Swal.fire("Suprimée!", "", "success");
          })
          .catch(function (error) {
            Swal.fire("Erreur!", "", "error");
          });
      }
    });
  };

  // Suppression de toute les musiques
  const handleAllDelete = () => {
    MySwal.fire({
      title: `Êtes-vous sûr de vouloir supprimer toutes les chansons?`,
      showCancelButton: true,
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        songs.forEach((song) => {
          axios
            .delete(`${FETCH}/currentsongs/${song.id}`, {
              headers: {
                "x-access-token": token,
              },
            })
            .then(() => {
              console.log("yes");

              Swal.fire("Suprimée!", "", "success");
            });
        });
      }
    });
  };

  const handleUnavailableMusic = (id) => {
    // je recupere le status de ma musique
    let song = songs.filter((song) => song.id === id)[0];
    let status = song.unavailable === 0 ? 1 : 0;
    // je stock le text en string en fonction de son etat
    let statusMsg = song.unavailable === 0 ? "indisponible" : "disponible";
    MySwal.fire({
      title: `Êtes-vous sûr de vouloir mettre cette chanson en ${statusMsg}`,
      showCancelButton: true,
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `${FETCH}/currentsongs/${id}`,
            { unavailable: status },
            {
              headers: {
                "x-access-token": token,
              },
            }
          )
          .then(() => {
            Swal.fire("Modifié!", "", "success");
          })
          .catch(function (error) {
            Swal.fire("Erreur!", "", "error");
          });
      }
    });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <div className="flex justify-end mb-5">
          <button
            onClick={() => {
              handleAllDelete();
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Tout supprimer
          </button>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Musique
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {songs.map((song) => (
                  <tr key={song.id}>
                    <td className=" py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {song.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {song.artist}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={
                          song.unavailable === 1
                            ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                            : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                        }
                      >
                        {song.unavailable === 1 ? "Indispo" : "Dispo"}
                      </span>
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap ">
                      <div
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        onClick={() => handleDeleteMusic(song.id)}
                      >
                        <BsFillTrashFill size={24} />
                      </div>
                    </td>
                    <td className=" py-4 whitespace-nowrap ">
                      <div
                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                        onClick={() => handleUnavailableMusic(song.id)}
                      >
                        {song.unavailable === 0 ? (
                          <CgUnavailable size={25} />
                        ) : (
                          <AiOutlineCheck size={25} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicLayout;
