import React from "react";
import "./BootLoader.css";

import logo from "../assets/logo.png";

type Props = {
  visible: boolean;
};

export default function BootLoader({ visible }: Props) {
  return (
    <div className={`bootLoader ${visible ? "isVisible" : "isHidden"}`} aria-hidden={!visible}>
      <img className="bootLoaderLogo" src={logo} alt="BLACK ROCK" />
    </div>
  );
}
