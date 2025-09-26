import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // console.log(pathname)
  }, [pathname]);

  return null; // no UI needed
};

export default ScrollToTop;
