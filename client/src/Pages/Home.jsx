import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SR from "../assets/sr.jpg";
import axios from "axios";
import { FETCH } from "../FETCH";
import { FiLoader } from "react-icons/fi";

// titre de la page
const title = "Titre";

// description
const description =
  "Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et";

// section
const sections = [
  {
    id: 1,
    name: "Music Request",
    description: "Request your favorite music",
    imageUrl: SR,
    path: "/songrequest",
  },
  // {
  //   id: 2,
  //   name: "Wall Picture",
  //   description: "Nikoumouk l'image",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  //   path: "/wallpicture",
  // },
];

const Home = () => {
  //Verification de la soirée
  const [event, setEvent] = useState();
  const [eventLoad, setEventLoad] = useState(false);
  let info = {};

  useEffect(() => {
    axios
      .get(`${FETCH}/events`)
      .then((res) => {
        setEvent(res.data);
        setTimeout(function () {
          setEventLoad(true);
        }, 2000);
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  }, []);

  return (
    <div>
      {eventLoad ? (
        event.length > 0 ? (
          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {event[0].name}
                </h2>
                {/* <p className="text-xl text-gray-500">{description}</p> */}
              </div>
              <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                {sections.map((section) => (
                  <Link to={section.path} key={section.id}>
                    <li>
                      <div className="space-y-4">
                        <div className="aspect-w-3 aspect-h-2">
                          <img
                            className="object-cover shadow-lg rounded-lg"
                            src={section.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg leading-6 font-medium space-y-1">
                            <h3>{section.name}</h3>
                            <p className="text-indigo-600">
                              {section.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white ">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                {/*<h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Request*/}
                {/*    Songs</h2>*/}
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Request Songs
                </p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                  Veuillez vous connecter afin de creer un évenement!
                </p>
                <Link to="/login">
                  <div className="inline-flex rounded-md shadow">
                    <div className="mt-4 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                      Login
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full h-screen justify-center items-center flex flex-col">
          <FiLoader size={42} className="animate-spin" />
          <h2 className="animate-pulse">Chargement</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
