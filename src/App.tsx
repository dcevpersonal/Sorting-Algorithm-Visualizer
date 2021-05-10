import React, { useState } from "react";
import Style from "./App.module.scss";

import Grid from "./components/Blocks/Grid";
import DisplayPanel from "./components/UI/Display-Panel";
import ControlPanel from "./components/UI/Control-Panel";

function App() {
  const startSorting = () => {
    setStarSort(() => {
      return startSort ? false : true;
    });
  };

  const setSortRunningF = (value: boolean) => {
    setSortRunning(value);
  };

  const selectAlgorithmF = (value: number) => {
    setSelectAlgorithm(value);
  };

  const [startSort, setStarSort] = useState(false);
  const [selectAlgorithm, setSelectAlgorithm] = useState(0);
  const [sortRunning, setSortRunning] = useState(false);

  return (
    <div className={Style.App}>
      <div className={Style.App__Container}>
        <DisplayPanel selectAlgorithmF={selectAlgorithmF} />
        <Grid
          startSort={startSort}
          sortRunning={sortRunning}
          setSortRunningF={setSortRunningF}
          selectAlgorithm={selectAlgorithm}
        />
      </div>

      <ControlPanel startSorting={startSorting} sortRunning={sortRunning} />
    </div>
  );
}

export default App;
