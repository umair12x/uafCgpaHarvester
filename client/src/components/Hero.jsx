import React from "react";
import Logo from "./partials/Logo";

const Hero = () => {
  return (
    <section className="w-full flex justify-center items-center px-4">
      <div className="flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 py-14 sm:py-16 md:py-20 max-w-4xl">
        <div className="scale-90 sm:scale-100">
          <Logo />
        </div>

        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight Main-Heading-Style">
          CGPA Calculator for
          <br />
          University of Agriculture,
          <br />
          Faisalabad
        </h2>

        <p className="font-light text-sm sm:text-base md:text-lg  opacity-80 text-style">
          Get your best results
        </p>
      </div>
    </section>
  );
};

export default Hero;
