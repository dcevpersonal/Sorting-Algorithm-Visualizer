import React from "react";
import Style from "./Display-Panel.module.scss";

import Range from "./Range";

// Interface

interface props {
  selectAlgorithmF(value: number): void;
}

function DisplayPanel(props: props) {
  return (
    <div className={Style.DisplayPanel}>
      <Range
        numOfElements={["Quick-Sort", "Merge-Sort", "Heap-Sort", "Bubble-Sort"]}
        selectAlgorithmF={props.selectAlgorithmF}
      />
    </div>
  );
}

export default React.memo(DisplayPanel);
