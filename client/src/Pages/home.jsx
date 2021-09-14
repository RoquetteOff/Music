import React from "react";
import { Link } from "react-router-dom";

// titre de la page
const title = "Titre";

// description
const description =
  "Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et";

// section
const sections = [
  {
    id:1,
    name: "Music Request",
    description: "Request your favorite music",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    path: "/songrequest",
  },
  // {
 //   id:2,
  //   name: "Wall Picture",
  //   description: "Nikoumouk l'image",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  //   path: "",
  // },
];

const home = () => {
  return (
    <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <div className="space-y-12">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-xl text-gray-500">{description}</p>
        </div>
        <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
          {sections.map((section) => (
            <Link to={section.path} key={section.id}>
              <li >
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
                      <p className="text-indigo-600">{section.description}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default home;
