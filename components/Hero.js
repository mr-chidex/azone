import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";

const Hero = () => {
  const scrollHandler = () => {
    window.scrollTo(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="hero">
      <div>
        <h1
          data-aos="fade-down"
          className="text-capitalize text-center fw-bold title p-1"
        >
          Look good, don&apos;t just feel it
        </h1>
        <p data-aos="fade-left" className="text-center fs-5 p-1">
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
