import { Route, Routes, useLocation } from "react-router-dom";
import { webRoutes } from "./Routes/WebRoutes";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import Lenis from "lenis";

const renderRoutes = (routes) =>
  routes.map(({ path, index, element, children }, i) => (
    <Route key={i} path={path} index={index} element={element}>
      {children && renderRoutes(children)}
    </Route>
  ));

function App() {
  const location = useLocation();
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  // React.useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>{renderRoutes(webRoutes)}</Routes>
    </AnimatePresence>
  );
}

export default App;
