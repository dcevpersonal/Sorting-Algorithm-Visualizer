import React, { useState } from "react";
import Style from "./Range.module.scss";

interface props {
  numOfElements: Array<string>;
}

function Range(props: props) {
  const [activeCircle, setActiveCircle] = useState(0);

  return (
    <div className={Style.Range}>
      <div className={Style.Range__InputContainer}>
        {props.numOfElements.map((e, i) => {
          return (
            <input
              key={e + "-" + i}
              type="radio"
              className={Style.Range__InputContainer__Circle}
              name="range"
              onClick={() => {
                setActiveCircle(i);
              }}
            />
          );
        })}

        <div className={Style.Range__InputContainer__Indicator}></div>
        <div className={Style.Range__InputContainer__Line}></div>
      </div>
      <div className={Style.Range__TextContainer}>
        {props.numOfElements.map((e, i) => {
          return (
            <h1
              key={e + "-" + i}
              className={
                i === activeCircle
                  ? ` ${Style.Range__TextContainer__Text__Active}
                      ${Style.Range__TextContainer__Text}`
                  : Style.Range__TextContainer__Text
              }
            >
              {e}
            </h1>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Range);
