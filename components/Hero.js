import Image from "next/image";
import React from "react";

const Hero = () => {
  const scrollHandler = () => {
    window.scrollTo(window.innerWidth + 100, window.innerHeight + 100);
  };

  return (
    <div className="hero">
      <div>
        <h1 className="text-capitalize fw-bold">
          Look good, don&apos;t just feel it
        </h1>
        <p className="text-center">
          Buy quality, comfortable outfits and wears
        </p>

        <div className="text-center">
          <span className="mouse" onClick={scrollHandler}>
            <Image src="/mouse.svg" alt="next" height={50} width={50} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
