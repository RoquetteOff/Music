import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { FETCH } from "../../FETCH";

const MySwal = withReactContent(Swal);

const EventLayout = () => {
  const [dataLoad, setDataLoad] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  const [eventCurrent, setEventCurrent] = useState({ name: null });

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
          .post(`${FETCH}/app`, {
            text: newEvent,
            type: "name",
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
      .get(`${FETCH}/app`)
      .then((response) => {
        setDataLoad(true);
        if (response.data.filter((res) => res.type === "name").length > 0) {
          let result = response.data.filter((res) => res.type === "name");
          setEventCurrent({ ...eventCurrent, name: result[0].text });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
            .delete(`${FETCH}/app/remove/all`, {
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
            setEventCurrent({ name: null });
            fetchData();
          })
          .catch(() => {
            Swal.fire("Erreur!", "Une erreur est survenue", "error");
          });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {dataLoad ? (
        eventCurrent.name === null ? (
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
                    Event Name
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
    </div>
  );
};

export default EventLayout;
