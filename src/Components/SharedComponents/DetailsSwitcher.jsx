import React from "react";
import briefcase from "../../assets/Images/briefcase.svg";
import scissors from "../../assets/Images/scissor.svg";
import star from "../../assets/Images/star-icon.svg";

const DetailsSwitcher = ({ setActive, active }) => {
  const [isActive, setIsActive] = React.useState({ left: 0, width: 0 });
  const tabRef = React.useRef([]);

  React.useEffect(() => {
    const idx = tabs.findIndex((_, idx) => idx === active);
    const el = tabRef.current[idx];
    if (el) {
      const { offsetLeft, offsetWidth } = el;
      setIsActive({ left: offsetLeft, width: offsetWidth });
    }
  }, [active, setActive, tabRef]);

  return (
    <div className="-ml-6 xs:ml-0 -mr-6 xs:mr-0 bg-light_Purple rounded-none xs:rounded-t-2xl shadow-sm p-4 pt-6 px-6">
      <ul className="flex items-center justify-between relative">
        <span
          className="absolute h-[.15rem] bg-darkPurple rounded-full transition-all duration-300"
          style={{
            bottom: "-.5rem",
            left: `${isActive.left}px`,
            width: `${isActive.width + 15}px`,
          }}
        ></span>
        {tabs.map((tab, idx) => (
          <li
            ref={(el) => (tabRef.current[idx] = el)}
            onClick={() => setActive(idx)}
            key={idx}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-300 ${
              active === idx ? "text-darkPurple" : "text-gray"
            }`}
          >
            <img
              className={active === idx ? "filter-purple2" : null}
              src={tab.icon}
              alt={`${tab.icon} icon`}
            />
            <span>{tab.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsSwitcher;

const tabs = [
  {
    icon: briefcase,
    label: "About us",
  },
  {
    icon: scissors,
    label: "Services",
  },
  {
    icon: star,
    label: "Reviews",
  },
];

// briefcase.svg
