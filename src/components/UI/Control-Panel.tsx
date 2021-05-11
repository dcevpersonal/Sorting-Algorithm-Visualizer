import React from "react";
import Style from "./Control-Panel.module.scss";

import CircularButton from "./Circular-Button";

interface props {
  startSorting(): void;
  startGenerateArrayF(): void;
  sortRunning: boolean;
}

function ControlPanel(props: props) {
  return (
    <div className={Style.ControlPanel}>
      <CircularButton
        starSorting={props.startSorting}
        sortRunning={props.sortRunning}
        startGenerateArrayF={props.startGenerateArrayF}
        type={"play"}
        id={Style.CircularButton}
      />
      <CircularButton
        starSorting={props.startSorting}
        sortRunning={props.sortRunning}
        startGenerateArrayF={props.startGenerateArrayF}
        type={"repeat"}
        id={Style.CircularButton}
      />
    </div>
  );
}

export default React.memo(ControlPanel);
