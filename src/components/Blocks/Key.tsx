import React from "react";
import Style from "./Key.module.scss";

interface props {
  iden: string;
  size: number;
  selected: boolean;
  section: boolean;
}

function Key(props: props) {
  return (
    <div
      className={Style.Key}
      style={{
        height: `${props.size * 5}px`,
        background: props.selected
          ? "var(--Red-1)"
          : props.section
          ? "var(--Blue-1)"
          : "var(--Black-2)",
      }}
      id={props.iden}
    ></div>
  );
}

export default React.memo(Key);
