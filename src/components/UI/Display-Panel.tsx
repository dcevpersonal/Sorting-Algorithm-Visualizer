import React from "react";
import Style from "./Display-Panel.module.scss";

import Range from "./Range";

function DisplayPanel() {
  return (
    <div className={Style.DisplayPanel}>
      <Range
        numOfElements={["Quick-Sort", "Merge-Sort", "Heap-Sort", "Bubble-Sort"]}
      />
    </div>
  );
}

export default React.memo(DisplayPanel);
