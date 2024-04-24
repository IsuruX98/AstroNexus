import React from "react";

const courses = [
  {
    title: "Mars Rover Photos",
    description:
      "Explore the latest photos captured by Mars rovers and uncover the mysteries of the Red Planet.",
    imageUrl:
      "https://scitechdaily.com/images/NASA-Curiosity-Mars-Rover-Art.jpg",
    alt: "Mars Rover Photos",
  },
  {
    title: "Astronomy Picture of the Day",
    description:
      "Discover stunning images of our universe curated by NASA every day.",
    imageUrl:
      "https://c02.purpledshub.com/uploads/sites/41/2021/01/astronomy-beginners-uk-7f589e4.jpg",
    alt: "Astronomy Picture of the Day",
  },
  {
    title: "Earth Imagery APIs",
    description:
      "Access satellite imagery of Earth from NASA's APIs for various applications and research purposes.",
    imageUrl:
      "https://cff2.earth.com/uploads/2022/05/05083713/Poverty4-scaled.jpg",
    alt: "Earth Imagery APIs",
  },
];

const FeaturedCourses = () => {
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
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={course.imageUrl}
                alt={course.alt}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h4 className="text-white text-lg font-semibold mb-2">
                {course.title}
              </h4>
              <p className="text-gray-300">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
