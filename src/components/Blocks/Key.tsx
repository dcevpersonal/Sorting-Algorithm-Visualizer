import React from "react";
import Style from "./Key.module.scss";

interface props {
  iden: string;
  size: number;
}

function Key(props: props) {
  return (
    <div
      className={Style.Key}
      style={{
        height: `${props.size * 5}px`,
      }}
      id={props.iden}
    ></div>
  );
}

export default React.memo(Key);
