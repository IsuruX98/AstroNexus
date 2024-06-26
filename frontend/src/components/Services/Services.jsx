import React from "react";
import { Link } from "react-router-dom";
import apd from "../../assets/images/apd.webp";
import epic from "../../assets/images/epic.webp";
import mrp from "../../assets/images/mrp.webp";

const services = [
  {
    title: "Mars Rover Photos",
    description:
      "Explore the latest photos captured by Mars rovers and uncover the mysteries of the Red Planet.",
    imageUrl: mrp,
    alt: "Mars Rover Photos",
    route: "/mrp",
  },
  {
    title: "Astronomy Picture of the Day",
    description:
      "Discover stunning images of our universe curated by NASA every day.",
    imageUrl: apd,
    alt: "Astronomy Picture of the Day",
    route: "/apd",
  },
  {
    title: "Earth Polychromatic Imaging Camera",
    description:
      "Access satellite imagery of Earth from NASA's EPIC for various applications and research purposes.",
    imageUrl: epic,
    alt: "Earth Polychromatic Imaging Camera",
    route: "/epic",
  },
];

const FeaturedServices = () => {
  return (
    <div id="Services" className="bg-gray-900 pb-20 pt-32 lg:px-32 px-12">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="text-sky-500 text-lg font-semibold mb-2 block">
            Featured Services
          </span>
          <h2 className="text-white text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
            Explore Our Offerings
          </h2>
          <p className="text-gray-300 text-base">
            Discover our featured services tailored to meet your astronomical
            needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link to={service.route} key={index}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:ring-2 hover:ring-sky-500 cursor-pointer h-full">
                <img
                  src={service.imageUrl}
                  alt={service.alt}
                  className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h4 className="text-white text-lg font-semibold mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-300">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedServices;
