import React from "react";
import Style from "./Circular-Button.module.scss";

interface props {
  starSorting(): void;
  sortRunning: boolean;
}

function CircularButton(props: props) {
  return (
    <button
      className={
        props.sortRunning
          ? `${Style.CircularButton} ${Style.CircularButton__Disabled}`
          : Style.CircularButton
      }
      onClick={props.starSorting}
    >
      <div className={Style.CircularButton_Triangle}></div>
    </button>
  );
}

export default React.memo(CircularButton);
