import React from 'react';

import loader from "../../assets/images/loader.gif";

interface ILoader {
    width?: number,
    position?: "center" | "left" | "right"
}

const Loader: React.FC<ILoader> = ({width = 100, position = "center"}) => {
  return (
    <div style={{width: `${width}px`}} className={`w-full flex ${position === "center" ? "justify-center mx-auto my-0" : position === "right" ? "justify-end ml-[100%]" : ""}`}>
        <img src={loader} />
    </div>
  )
}

export default Loader