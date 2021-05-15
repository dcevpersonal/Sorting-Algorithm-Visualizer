import React, { useState } from "react";
import Style from "./Circular-Button.module.scss";

// Interface

interface props {
  setStarSortF?(): void;
  setGenerateArrayF?(): void;
  selectSpeedF?(value: number): void;
  selectSizeF?(value: number): void;
  selectSpeed?: number;
  selectSize?: number;
  sortRunning: boolean;
  type: string;
  id: string;
}

function CircularButton(props: props) {
  // Animation
  const [repeatAnim, setRepeatAnim] = useState(false);

  return (
    <button
      aria-label={props.type}
      title={props.type}
      className={
        props.sortRunning
          ? `${Style.CircularButton} ${Style.CircularButton__Disabled}`
          : props.type === "Speed" || props.type === "Size"
          ? `${Style.CircularButton} ${Style.CircularButton__Indicator}`
          : `${Style.CircularButton} ${Style.CircularButton__Design}`
      }
      onClick={() => {
        if (!props.sortRunning) {
          if (props.type === "Repeat" && props.setGenerateArrayF) {
            props.setGenerateArrayF();
            setRepeatAnim(true);
            setTimeout(() => {
              setRepeatAnim(false);
            }, 300);
          } else if (props.type === "Play" && props.setStarSortF) {
            props.setStarSortF();
          } else if (
            props.type === "Speed" &&
            props.selectSpeedF &&
            props.selectSpeed !== undefined
          ) {
            if (props.selectSpeed < 150) {
              props.selectSpeedF(props.selectSpeed + 10);
            } else {
              props.selectSpeedF(0);
            }
          } else if (
            props.type === "Size" &&
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
          (props.type === "Size" || props.type === "Speed") &&
          !props.sortRunning
        ) {
          if (
            props.type === "Speed" &&
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
            props.type === "Size" &&
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
              props.type === "Speed"
                ? `${
                    props.selectSpeed !== undefined
                      ? props.selectSpeed + 50
                      : 200
                  }`
                : props.type === "Size"
                ? `${
                    props.selectSize !== undefined
                      ? 200 - props.selectSize
                      : 200
                  }`
                : "",
          }}
        />
      </svg>
      {/* Play */}
      <div
        className={Style.CircularButton_Play}
        style={{ display: props.type === "Play" ? "" : "none" }}
      ></div>
      <div
        className={
          repeatAnim
            ? `${Style.CircularButton_Repeat} ${Style.CircularButton_Repeat__Active}`
            : Style.CircularButton_Repeat
        }
        style={{ display: props.type === "Repeat" ? "" : "none" }}
      ></div>
      {/* Speed */}
      <div
        className={Style.CircularButton_Speed}
        style={{
          display: props.type === "Speed" ? "" : "none",
        }}
      ></div>
      {/* Size */}
      <div
        className={Style.CircularButton_Size}
        style={{
          display: props.type === "Size" ? "" : "none",
        }}
      ></div>
    </button>
  );
}

export default React.memo(CircularButton);
