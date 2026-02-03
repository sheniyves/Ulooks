import { useEffect, useState } from "react";

import backgroundIcon from "../../assets/Images/formIcons.svg";
import { motion } from "framer-motion";

const OnboardingCarousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const DELAY = 5000;
  const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
  };

  useEffect(() => {
    const intervalRef = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, DELAY);

    return () => clearTimeout(intervalRef);
  }, [currentIndex, images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        // style={{ backgroundImage: `url(${backgroundIcon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        className="flex transition-transform duration-700 ease-in-out w-full h-full"
        animate={{ translateX: `-${currentIndex * 100}% ` }}
        transition={SPRING_OPTIONS}
      >
        {images.map((src, index) => (
          <motion.img
            key={index}
            src={src}
            alt={`Onboarding ${index + 1}`}
            className="h-full w-full object-cover flex-shrink-0"
          />
        ))}
      </motion.div>
      <Dots currentIndex={currentIndex} images={images} />
    </div>
  );
};

export default OnboardingCarousel;

const Dots = ({ currentIndex, images }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full transition-all duration-300 ${
            currentIndex === index ? "bg-gold-purple" : "bg-buttonGray"
          }`}
        />
      ))}
    </div>
  );
};
