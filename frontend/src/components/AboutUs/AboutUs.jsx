import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 py-20 pb-20 pt-32 lg:px-32 px-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="text-sky-500 text-lg font-semibold mb-2 block">
            About Us
          </span>
          <h2 className="text-white text-3xl font-bold mb-4 sm:text-4xl md:text-5xl">
            Explore Our Mission
          </h2>
          <p className="text-gray-300 text-base">
            Learn about our organization and our commitment to bringing the
            wonders of space closer to you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 items-center">
          <div className="w-full">
            <div className="flex justify-center">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/800px-NASA_logo.svg.png"
                }
                alt={"NASA"}
                className="w-96 mb-4 rounded-lg"
              />
            </div>
          </div>
          <div>
            <p className="text-gray-300 mb-4">
              At AstroNexus, we are passionate about astronomy and space
              exploration. Our mission is to provide a platform where
              enthusiasts and learners alike can access a wealth of astronomical
              data and imagery from NASA's APIs. Whether you're interested in
              browsing the latest Mars Rover photos, exploring the Astronomy
              Picture of the Day, or accessing Earth imagery APIs, we've got you
              covered.
            </p>
            <p className="text-gray-300">
              Our team is dedicated to curating and delivering high-quality
              content that sparks curiosity and inspires a deeper understanding
              of the cosmos. Join us on this cosmic journey as we explore the
              wonders of the universe together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
