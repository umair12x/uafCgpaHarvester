import React from "react";
import Logo from "./partials/Logo";

const Hero = () => {
  return (
    <div>
      <div className="py-30 sm:py-34 gap-5 flex flex-col max-w-full  drop-shadow-lg justify-center items-center ">
        <Logo />
        <span className="text-custom"></span>
        <h2 className="font-bold md:text-5xl lg:text-6xl text-center text-3xl mx-5 text-vibrant">
          CGPA Harvester for
          <br />
          Unversity of Agriculture,
          <br /> Faisalabad
        </h2>
        <p className="font-thin md:text-lg text-sm secondary-text  drop-shadow-lg  opacity-75">
          Get your best results
        </p>
      </div>
    </div>
  );
};

export default Hero;
