import React from "react";
import Style from "./Control-Panel.module.scss";

import CircularButton from "./Circular-Button";

interface props {
  startSorting(): void;
  sortRunning: boolean;
}

function ControlPanel(props: props) {
  return (
    <div className={Style.ControlPanel}>
      <CircularButton
        starSorting={props.startSorting}
        sortRunning={props.sortRunning}
      />
    </div>
  );
}

export default React.memo(ControlPanel);
