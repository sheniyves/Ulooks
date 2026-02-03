import Error from "../WebComponents/Error";

const SlideOption = ({
  options = [],
  useIcons = [],
  label,
  error,
  setActiveIndex,
  activeIndex,
  background ="bg-purple-strong-gold"
}) => {
  return (
    <div className="my-4 relative">
      <label className="block mb-2 font-medium text-sm text-yellow_gold">
        {label}
      </label>
      <div className="relative bg-option_background p-1 w-full flex rounded-full list">
        <div
          className={`absolute top-0 shadow-sm h-full  rounded-full transition-all duration-300 ease-in-out ${background}`}
          style={{
            width: `${100 / options.length}%`,
            left: `${(100 / options.length) * activeIndex}%`,
          }}
        />

        {options.map((option, index) => (
          <div
            key={option}
            onClick={() => setActiveIndex(index)}
            className={`z-10 cursor-pointer text-center w-full py-2 transition-all duration-300 ease-in-out flex items-center justify-center gap-1 ${
              activeIndex === index
                ? "text-white font-semibold"
                : "text-darkPurple font-normal"
            }`}
          >
            {useIcons[index] && (
              <span className="inline-flex items-center">
                {typeof useIcons[index] === "string" ? (
                  <img
                    src={useIcons[index]}
                    alt={`${option} icon`}
                    className={`mr-2 hidden xs:inline-block  ${
                      activeIndex === index ? "" : " grayscale"
                    }`}
                  />
                ) : (
                  useIcons[index]
                )}
              </span>
            )}
            {option}
          </div>
        ))}
      </div>
      <Error error={error} />
    </div>
  );
};

export default SlideOption;
