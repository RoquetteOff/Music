import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { FETCH } from "../../FETCH";
import { AiOutlineDownload } from "react-icons/ai";
import { FaRegCheckSquare } from "react-icons/fa";
import MusicBandeau from "../../assets/musicbandeau.jpg";

const MySwal = withReactContent(Swal);

const EventLayout = () => {
  const [dataLoad, setDataLoad] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [eventCurrent, setEventCurrent] = useState({});
  const [imagePreview, setImagePreview] = useState({
    file: null,
    imagePreviewUrl: null,
  });

  const [file, setFile] = useState(null);

  // ajout d'un nouvel event
  const addNewEvent = (e) => {
    e.preventDefault();
    MySwal.fire({
      title: `Êtes-vous sûr de vouloir créer l'évenement ${newEvent}?`,
      showCancelButton: true,
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${FETCH}/events`, {
            name: newEvent,
          })
          .catch(function (error) {
            console.log(error);
          });
        Swal.fire("Créer!", "", "success");
        fetchData();
      }
    });
  };

  const fetchData = () => {
    axios
      .get(`${FETCH}/events`)
      .then((response) => {
        console.log(response);
        setEventCurrent(response.data[0]);
        setDataLoad(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // suprimer un event et la donnée
  const handleRemove = () => {
    const token = localStorage.getItem("token");
    MySwal.fire({
      title: "Êtes-vous sur ?",
      text: "Cela entraînera la suppression des données",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je suis sur !",
    }).then((result) => {
      if (result.isConfirmed) {
        new Promise((resolve, reject) => {
          axios
            .delete(`${FETCH}/events/remove/all`, {
              headers: {
                "x-access-token": token,
              },
            })
            .then((res) => {
              resolve(res);
            })
            .catch(function (error) {
              reject(error);
            });
        })
          .then(() => {
            Swal.fire("Suprimé!", "L'évenement est supprimé", "success");
            setEventCurrent(null);
            fetchData();
          })
          .catch(() => {
            Swal.fire("Erreur!", "Une erreur est survenue", "error");
          });
      }
    });
  };
  // changement de l'image d'en-tête
  const changeImageTop = async (e) => {
    e.preventDefault();
    MySwal.fire({
      title: "Êtes-vous sur de vouloir modifier l'image d'en-tête?",
      text: "Cela entraînera la suppression de l'ancienne image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je suis sur !",
    }).then((result) => {
      if (result.isConfirmed) {
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          axios
            .post(`${FETCH}/upload/bg`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              resolve(res);
            })
            .catch(function (error) {
              reject(error);
            });
        })
          .then(() => {
            Swal.fire("Succés!", "L'image est changé", "success");
          })
          .catch(() => {
            Swal.fire("Erreur!", "Une erreur est survenue", "error");
          });
      }
    });
    console.log(e);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);

    console.log("test dans la fonction", e.target.files[0]);

    if (e.target.files[0] !== undefined) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setImagePreview({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview({
        file: null,
        imagePreviewUrl: null,
      });
    }
  };
  console.log(eventCurrent);

  return (
    <div>
      {dataLoad ? (
        eventCurrent === null || eventCurrent === undefined ? (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Nouvel Event
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Saisir le titre de l'évenement. Attention celui-ci sera
                  affiché sur la page d'accueil.
                </p>
              </div>
              <form
                className="mt-5 sm:flex sm:items-center"
                onSubmit={(e) => addNewEvent(e)}
              >
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="name" className="sr-only">
                    Nom de l'évenement
                  </label>
                  <input
                    required
                    onChange={(e) => setNewEvent(e.target.value)}
                    type="text"
                    name="eventName"
                    id="eventName"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Romain's birthday"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Créer
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Suppression
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  En supprimant l'évenement vous supprimer toutes les données
                  liées.
                </p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => handleRemove()}
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Supprimer l'évenement
                </button>
              </div>
            </div>
          </div>
        )
      ) : null}

      <div className="bg-white shadow sm:rounded-lg mt-5">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Image d'en-tete
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Modifier l'image d'en-tête</p>
          </div>
          <div className="flex justify-between">
            <form
              className="mt-5 sm:flex sm:items-center"
              onSubmit={(e) => changeImageTop(e)}
            >
              <div className=" sm:max-w-xs">
                <label
                  htmlFor="file-upload"
                  className={
                    file !== null && file !== undefined
                      ? "flex justify-between items-center cursor-pointer py-1 px-3 border-2 border-green-600 rounded-md w-28"
                      : "flex justify-between items-center cursor-pointer py-1 px-3 border-2 border-gray-300 rounded-md w-28"
                  }
                >
                  <i className="">
                    {file !== null && file !== undefined ? (
                      <FaRegCheckSquare size={20} className="text-green-600" />
                    ) : (
                      <AiOutlineDownload size={20} className="text-gray-600" />
                    )}
                  </i>
                  <span
                    className={
                      file !== null && file !== undefined
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    Upload
                  </span>
                </label>
                <input
                  accept=".png,.jpeg,.gif,.jpg"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Modifier
              </button>
            </form>
            {file !== null || file !== undefined ? (
              <div>
                <img
                  className="w-52"
                  src={
                    imagePreview.imagePreviewUrl
                      ? imagePreview.imagePreviewUrl
                      : MusicBandeau
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLayout;
