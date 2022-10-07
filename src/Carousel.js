import React, { useState } from "react";
import { BiChevronRight, BiChevronLeft, BiReplyAll } from "react-icons/bi";
import "./cards.scss";
import { locations } from "./markers";
import { clickRight } from "./clickRight.js";

//change this later
export const rotateOrder = [
  "default",
  "mace",
  "uob",
  "iqvia",
  "inrix",
  "default"
];

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Carousel = ({ children, setActiveMarker, order, setOrder, setZoom }) => {
  // const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  const MAX_VISIBILITY = 3;

  // function clickRight() {
  //   setActive((i) => i + 1);
  //   order = order + 1;
  //   setOrder(order);
  //   setActiveMarker(locations[rotateOrder[order]]);
  // }

  // function clickLeft() {
  //   setActive((i) => i - 1);
  //   order = order - 1;
  //   setOrder(order);
  //   setActiveMarker(locations[rotateOrder[order]]);
  // }

  function handleClickRight() {
    clickRight(order, setOrder, setActiveMarker, setZoom);
  }

  return (
    <div className="carousel">
      {/* {active > 0 && (
        // <button className="nav left" onClick={() => clickLeft()}>
        <button className="nav left">
          <BiChevronLeft />
        </button>
      )} */}
      {React.Children.map(children, (child, i) => (
        <div
          className="card-container"
          style={{
            "--active": i === order ? 1 : 0,
            "--offset": (order - i) / 3,
            "--direction": Math.sign(order - i),
            "--abs-offset": Math.abs(order - i) / 3,
            "pointer-events": order === i ? "auto" : "none",
            opacity: Math.abs(order - i) >= MAX_VISIBILITY ? "0" : "1",
            display: Math.abs(order - i) > MAX_VISIBILITY ? "none" : "block"
          }}
        >
          {child}
        </div>
      ))}
      {order < count - 1 && (
        <button className="nav right" onClick={() => handleClickRight()}>
          <BiChevronRight id="right-navigate-button" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
export { Card };
