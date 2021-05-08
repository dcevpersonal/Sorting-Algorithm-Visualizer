import React from "react";
import Style from "./App.module.scss";

import Grid from "./components/Blocks/Grid";
import DisplayPanel from "./components/UI/Display-Panel";

function App() {
  return (
    <div className={Style.App}>
      <DisplayPanel />
      <Grid />
    </div>
  );
}

export default App;
