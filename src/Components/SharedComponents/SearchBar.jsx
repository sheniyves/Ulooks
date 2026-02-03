import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearchCtx } from "../../Context/SearchCtx";

const SearchBar = ({ icon }) => {
  const { searchTerm, setSearchTerm } = useSearchCtx();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (window.location.pathname !== "/customerWebApp/search") {
      navigate("/customerWebApp/search");
    }
  };

  return (
    <div className={`border bg-[#F9F4FC] flex items-center gap-4 w-full border-[#D0D5DD] rounded-lg px-4 py-3 `}>
      <img src={icon} alt="Search icon" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="w-full border-none outline-none bg-transparent"
        placeholder="Search services"
      />
    </div>
  );
};

export default SearchBar;