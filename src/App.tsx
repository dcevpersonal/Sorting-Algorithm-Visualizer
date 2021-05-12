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
    console.log(selectSpeed);

    setSelectSpeed(value);
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
  const [selectSpeed, setSelectSpeed] = useState(100);

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
          startGenerateArray={startGenerateArray}
        />
      </div>

      <ControlPanel
        selectSpeedF={selectSpeedF}
        selectSpeed={selectSpeed}
        startSorting={startSorting}
        sortRunning={sortRunning}
        startGenerateArrayF={startGenerateArrayF}
      />
    </div>
  );
}

export default App;
