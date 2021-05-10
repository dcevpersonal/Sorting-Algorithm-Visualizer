import React, { useState } from "react";
import Style from "./Range.module.scss";

interface props {
  numOfElements: Array<string>;
  selectAlgorithmF(value: number): void;
}

function Range(props: props) {
  const [activeCircle, setActiveCircle] = useState(0);

  return (
    <div className={Style.Range}>
      <div className={Style.Range_InputContainer}>
        {props.numOfElements.map((e, i) => {
          return (
            <input
              key={e + "-" + i}
              type="radio"
              className={Style.Range_InputContainer_Circle}
              name="range"
              onClick={() => {
                setActiveCircle(i);
                props.selectAlgorithmF(i);
              }}
            />
          );
        })}

        <div className={Style.Range_InputContainer_Indicator}></div>
        <div className={Style.Range_InputContainer_Line}></div>
      </div>
      <div className={Style.Range_TextContainer}>
        {props.numOfElements.map((e, i) => {
          return (
            <h1
              key={e + "-" + i}
              className={
                i === activeCircle
                  ? ` ${Style.Range_TextContainer_Text__Active}
                      ${Style.Range_TextContainer_Text}`
                  : Style.Range_TextContainer_Text
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
