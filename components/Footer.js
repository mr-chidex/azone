import React from "react";

const Footer = () => {
  return (
    <footer style={{
      height: "10rem",
      display: "grid",
      placeItems: "center",
      background:"#111"
    }}>
      <div style={{ textAlign: "center" }}>
        All right reserved | Designed by @
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="http://github.com/mr-chidex"
        >
          Mr-Chidex
        </a>
      </div>
    </footer>
  );
};

export default Footer;
