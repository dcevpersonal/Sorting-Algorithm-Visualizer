import React from "react";
import Style from "./Copyright-Panel.module.scss";

function CopyrightPanel() {
  return (
    <div className={Style.CopyrightPanel}>
      <h1
        className={Style.CopyrightPanel_Text}
        title={"© Daniel Lane (Lazarev) - " + new Date().getFullYear()}
      >
        {"© Daniel Lane (Lazarev) - " + new Date().getFullYear()}
      </h1>
    </div>
  );
}

export default React.memo(CopyrightPanel);
