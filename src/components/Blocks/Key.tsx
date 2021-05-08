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
      className={
        props.selected
          ? `${Style.Key} ${Style.Key__Selected}`
          : props.section
          ? `${Style.Key} ${Style.Key__Section}`
          : Style.Key
      }
      style={{
        height: `${props.size * 5}px`,
      }}
      id={props.iden}
    ></div>
  );
}

export default React.memo(Key);
