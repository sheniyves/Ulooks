import React, { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, debouncedSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export const useSearchCtx = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error(
      "search context must be used within the search context provider"
    );
  return context;
};
