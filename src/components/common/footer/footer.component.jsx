import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import "./footer.style.scss";
import "../../../sass/base/_utilities.scss";

const Footer = () => {
  return (
    <footer className="footer u-child-center">
      <span>
        Copyright <FontAwesomeIcon icon={faCopyright} /> 2020 &nbsp; Cole Liang
      </span>
    </footer>
  );
};

export default Footer;
