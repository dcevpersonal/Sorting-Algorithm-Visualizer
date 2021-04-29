import React, { useState, useRef } from "react";
import Style from "./Grid.module.scss";
import Key from "./Key";

import { quickSortIterative } from "../Algorithms/QuickSort";

function Grid() {
  const generateArray = () => {
    const array: Array<number> = [];
    for (let i = 0; i < keysSize; i++) {
      let number = Math.floor(Math.random() * keysSize + 10);
      if (array.includes(number)) {
        number = Math.floor(Math.random() * keysSize + 10);
        i--;
      } else {
        array.push(number);
      }
    }
    return array;
  };

  const startSorting = () => {
    setAnim(() => {
      const arr = keys.slice(0);

      return quickSortIterative(arr);
    });
  };

  const startAnimate = () => {
    if (currentFrameRef.current > animRef.current.swap.length - 1) {
      return;
    }

    setCurrentFrame((s) => {
      let frame = s;

      setCurrentAnim(() => {
        return animRef.current.swap[s];
      });

      setKeysModif((v) => {
        const array = v.slice(0);
        array[animRef.current.swap[s][0]] = animRef.current.swap[s][1];
        array[animRef.current.swap[s][2]] = animRef.current.swap[s][3];
        return array;
      });
      frame = frame + 1;
      return frame;
    });

    setTimeout(startAnimate, 10);
  };

  const [keysSize, setKeysSize] = useState(150);

  const [keys, setKeys] = useState(() => {
    return generateArray();
  });

  const [keysModif, setKeysModif] = useState(() => {
    const array = keys.slice(0);
    return array;
  });

  const [anim, setAnim] = useState(() => {
    return { swap: [] };
  });

  const animRef = useRef(anim);
  animRef.current = anim;

  const [currentAnim, setCurrentAnim] = useState([0, 0, 0, 0]);
  const [currentFrame, setCurrentFrame] = useState(0);

  const currentFrameRef = useRef(currentFrame);
  currentFrameRef.current = currentFrame;

  console.log(anim);

  return (
    <div className={Style.Grid}>
      {keys.map((k, i) => {
        return (
          <Key
            key={i}
            iden={Style.Key}
            size={
              i === currentAnim[0]
                ? currentAnim[1]
                : i === currentAnim[2]
                ? currentAnim[3]
                : keysModif[i]
            }
          />
        );
      })}
      <button onClick={startSorting}>Sort</button>
      <button onClick={startAnimate}>Anim</button>
    </div>
  );
}

export default React.memo(Grid);
