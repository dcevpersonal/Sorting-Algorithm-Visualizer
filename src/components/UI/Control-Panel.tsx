import React from "react";
import Style from "./Control-Panel.module.scss";

import CircularButton from "./Circular-Button";

// Interface

interface props {
  setStarSortF(): void;
  setGenerateArrayF(): void;
  selectSpeedF(value: number): void;
  selectSizeF(value: number): void;
  selectSpeed: number;
  selectSize: number;
  sortRunning: boolean;
}

function ControlPanel(props: props) {
  return (
    <div className={Style.ControlPanel}>
      {/* Play */}
      <CircularButton
        setStarSortF={props.setStarSortF}
        sortRunning={props.sortRunning}
        type={"Play"}
        id={Style.CircularButton}
      />
      {/* Repeat */}
      <CircularButton
        sortRunning={props.sortRunning}
        setGenerateArrayF={props.setGenerateArrayF}
        type={"Repeat"}
        id={Style.CircularButton}
      />
      {/* Speed */}
      <CircularButton
        sortRunning={props.sortRunning}
        type={"Speed"}
        selectSpeed={props.selectSpeed}
        selectSpeedF={props.selectSpeedF}
        id={Style.CircularButton}
      />
      {/* Size */}
      <CircularButton
        sortRunning={props.sortRunning}
        type={"Size"}
        selectSizeF={props.selectSizeF}
        selectSize={props.selectSize}
        id={Style.CircularButton}
      />
    </div>
  );
}

export default React.memo(ControlPanel);
