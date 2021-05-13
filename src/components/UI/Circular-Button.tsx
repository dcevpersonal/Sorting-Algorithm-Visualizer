import React, { useState } from "react";
import Style from "./Circular-Button.module.scss";

interface props {
  starSorting?(): void;
  startGenerateArrayF?(): void;
  selectSpeedF?(value: number): void;
  selectSizeF?(value: number): void;
  selectSpeed?: number;
  selectSize?: number;
  sortRunning: boolean;
  type: string;
  id: string;
}

function CircularButton(props: props) {
  const [repeatAnim, setRepeatAnim] = useState(false);

  return (
    <button
      className={
        props.sortRunning
          ? `${Style.CircularButton} ${Style.CircularButton__Disabled}`
          : props.type === "speed" || props.type === "size"
          ? `${Style.CircularButton} ${Style.CircularButton__Indicator}`
          : `${Style.CircularButton} ${Style.CircularButton__Design}`
      }
      onClick={() => {
        if (!props.sortRunning) {
          if (props.type === "repeat" && props.startGenerateArrayF) {
            props.startGenerateArrayF();
            setRepeatAnim(true);
            setTimeout(() => {
              setRepeatAnim(false);
            }, 300);
          } else if (props.type === "play" && props.starSorting) {
            props.starSorting();
          } else if (
            props.type === "speed" &&
            props.selectSpeedF &&
            props.selectSpeed !== undefined
          ) {
            if (props.selectSpeed < 150) {
              props.selectSpeedF(props.selectSpeed + 10);
            } else {
              props.selectSpeedF(0);
            }
          } else if (
            props.type === "size" &&
            props.selectSizeF &&
            props.selectSize !== undefined
          ) {
            if (props.selectSize < 150) {
              props.selectSizeF(props.selectSize + 10);
            } else {
              props.selectSizeF(0);
            }
          }
        }
      }}
      onWheel={(e) => {
        if (
          (props.type === "size" || props.type === "speed") &&
          !props.sortRunning
        ) {
          if (
            props.type === "speed" &&
            props.selectSpeedF &&
            props.selectSpeed !== undefined
          ) {
            if (e.nativeEvent.deltaY > 0) {
              if (props.selectSpeed < 150) {
                props.selectSpeedF(props.selectSpeed + 10);
              } else {
                props.selectSpeedF(0);
              }
            } else {
              if (props.selectSpeed > 0) {
                props.selectSpeedF(props.selectSpeed - 10);
              } else {
                props.selectSpeedF(150);
              }
            }
          } else if (
            props.type === "size" &&
            props.selectSizeF &&
            props.selectSize !== undefined
          ) {
            if (e.nativeEvent.deltaY < 0) {
              if (props.selectSize < 150) {
                props.selectSizeF(props.selectSize + 10);
              } else {
                props.selectSizeF(0);
              }
            } else {
              if (props.selectSize > 0) {
                props.selectSizeF(props.selectSize - 10);
              } else {
                props.selectSizeF(150);
              }
            }
          }
        }
      }}
      id={props.id}
    >
      <svg className={Style.CircularButton_Svg}>
        <circle
          cx="25"
          cy="25"
          r="23"
          className={Style.CircularButton_Svg_Circle}
          style={{
            strokeDashoffset:
              props.type === "speed"
                ? `${
                    props.selectSpeed !== undefined
                      ? props.selectSpeed + 50
                      : 200
                  }`
                : props.type === "size"
                ? `${
                    props.selectSize !== undefined
                      ? 200 - props.selectSize
                      : 200
                  }`
                : "",
          }}
        />
      </svg>

      <div
        className={Style.CircularButton_Play}
        style={{ display: props.type === "play" ? "" : "none" }}
      ></div>
      <div
        className={
          repeatAnim
            ? `${Style.CircularButton_Repeat} ${Style.CircularButton_Repeat__Active}`
            : Style.CircularButton_Repeat
        }
        style={{ display: props.type === "repeat" ? "" : "none" }}
      ></div>
      <div
        className={Style.CircularButton_Speed}
        style={{
          display: props.type === "speed" ? "" : "none",
        }}
      ></div>
      <div
        className={Style.CircularButton_Size}
        style={{
          display: props.type === "size" ? "" : "none",
        }}
      ></div>
    </button>
  );
}

export default React.memo(CircularButton);
