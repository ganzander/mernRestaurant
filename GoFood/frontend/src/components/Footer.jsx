import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div>
      <footer
        className="d-flex flex-wrap justify-content-center align-items-center py-3 mt-4 border-top"
        style={{ backgroundColor: "#ecca00" }}
      >
        <Link
          to="/"
          className=" d-flex justify-content-center align-items-center text-center mx-4"
          style={{ color: "#F5F5F5	", textDecoration: "none" }}
        >
          © Savor Haven
        </Link>
        <a
          href="https://www.instagram.com/ganesh_mangla/"
          className=" d-flex justify-content-center align-items-center text-center mx-4"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.facebook.com/people/Ganesh-Mangla/pfbid02xZWG2Fm6LZz54Wq5d1hvvVRKWYiqGswitKLgYttqWiwoVYqojM3WU7gvJXKb9ZGal/"
          className=" d-flex justify-content-center align-items-center text-center"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </footer>
    </div>
  );
}
