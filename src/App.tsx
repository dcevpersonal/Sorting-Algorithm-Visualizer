import React from "react";
import Style from "./App.module.scss";

import Grid from "./components/Blocks/Grid";

function App() {
  return (
    <div className={Style.App}>
      <Grid />
    </div>
  );
}

export default App;
