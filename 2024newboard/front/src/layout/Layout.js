import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Layout() {
  const slideImg = [
    {
      original: "./images/slide02.png",
      description: "이미지1",
    },
    {
      original: "./images/slide02.png",
      description: "이미지1",
    },
  ];
  return (
    <>
      <div className="container m-auto">
        <Navbar />
      </div>
      <ReactImageGallery items={slideImg} showFullscreenButton={false} />
      <div className="container m-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
