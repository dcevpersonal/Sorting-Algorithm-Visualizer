import React from "react";
import Style from "./Circular-Button.module.scss";

interface props {
  starSorting(): void;
  startGenerateArrayF(): void;
  sortRunning: boolean;
  type: string;
  id: string;
}

function CircularButton(props: props) {
  return (
    <button
      className={
        props.sortRunning
          ? `${Style.CircularButton} ${Style.CircularButton__Disabled}`
          : Style.CircularButton
      }
      onClick={
        props.type === "play" ? props.starSorting : props.startGenerateArrayF
      }
      id={props.id}
    >
      <svg className={Style.CircularButton_Svg}>
        <circle
          cx="25"
          cy="25"
          r="23"
          className={Style.CircularButton_Svg_Circle}
        />
      </svg>

      <div
        className={Style.CircularButton_Triangle}
        style={{ display: props.type === "play" ? "" : "none" }}
      ></div>
      <div
        className={Style.CircularButton_Repeat}
        style={{ display: props.type === "repeat" ? "" : "none" }}
      ></div>
    </button>
  );
}

export default React.memo(CircularButton);
