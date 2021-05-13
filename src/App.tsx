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

  const selectSpeedF = (value: number) => {
    setSelectSpeed(value);
  };

  const selectSizeF = (value: number) => {
    setSelectSize(value);
  };

  const startGenerateArrayF = () => [
    setStartGenerateArray(() => {
      return startGenerateArray ? false : true;
    }),
  ];

  const [startSort, setStarSort] = useState(false);
  const [selectAlgorithm, setSelectAlgorithm] = useState(0);
  const [sortRunning, setSortRunning] = useState(false);
  const [startGenerateArray, setStartGenerateArray] = useState(false);
  const [selectSpeed, setSelectSpeed] = useState(10);
  const [selectSize, setSelectSize] = useState(80);

  return (
    <div className={Style.App}>
      <div className={Style.App__Container}>
        <DisplayPanel selectAlgorithmF={selectAlgorithmF} />
        <Grid
          selectSpeed={selectSpeed}
          startSort={startSort}
          sortRunning={sortRunning}
          setSortRunningF={setSortRunningF}
          selectAlgorithm={selectAlgorithm}
          selectSize={selectSize}
          startGenerateArray={startGenerateArray}
        />
      </div>

      <ControlPanel
        selectSpeedF={selectSpeedF}
        selectSizeF={selectSizeF}
        selectSize={selectSize}
        selectSpeed={selectSpeed}
        startSorting={startSorting}
        sortRunning={sortRunning}
        startGenerateArrayF={startGenerateArrayF}
      />
    </div>
  );
}

export default App;
