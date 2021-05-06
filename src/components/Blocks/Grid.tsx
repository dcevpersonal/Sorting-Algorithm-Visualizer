import React, { useState, useRef, useEffect } from "react";
import Style from "./Grid.module.scss";
import Key from "./Key";

import { quickSortIterative } from "../Algorithms/QuickSort";
import { heapSort } from "../Algorithms/HeapSort";
import { mergeSort } from "../Algorithms/MergeSort";
import { bubbleSort } from "../Algorithms/BubbleSort";

interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

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
      const animations = quickSortIterative(arr);
      animations.swap.push([NaN, NaN, NaN, NaN]);
      animations.section.push([0, keysSize]);
      return animations;
    });

    // setAnim(() => {
    //   const arr = keys.slice(0);
    //   const animations = mergeSort(arr);
    //   animations.swap.push([NaN, NaN, NaN, NaN]);
    //   animations.section.push([0, keysSize]);
    //   return animations;
    // });
    // setAnim(() => {
    //   const arr = keys.slice(0);
    //   const animations = heapSort(arr);
    //   animations.swap.push([NaN, NaN, NaN, NaN]);
    //   animations.section.push([0, keysSize]);
    //   return animations;
    // });
    // setAnim(() => {
    //   const arr = keys.slice(0);
    //   const animations = bubbleSort(arr);
    //   animations.swap.push([NaN, NaN, NaN, NaN]);
    //   animations.section.push([0, keysSize]);
    //   return animations;
    // });

    setIsSorted(true);
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
      setCurrentSection(() => {
        return animRef.current.section[s];
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

  const [keysSize, setKeysSize] = useState(100);

  const [keys] = useState(() => {
    return generateArray();
  });

  const [keysModif, setKeysModif] = useState(() => {
    const array = keys.slice(0);
    return array;
  });

  const [anim, setAnim] = useState(() => {
    const animations: animations = {
      swap: [],
      section: [],
    };
    return animations;
  });

  const animRef = useRef(anim);
  animRef.current = anim;

  const [currentAnim, setCurrentAnim] = useState([0, 0, 0, 0]);
  const [currentFrame, setCurrentFrame] = useState(0);

  const currentFrameRef = useRef(currentFrame);
  currentFrameRef.current = currentFrame;

  const [currentSection, setCurrentSection] = useState([0, keysSize]);

  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (isSorted) {
      startAnimate();
      console.log(anim.section);
      console.log(anim.swap);
    }
  }, [isSorted]);
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
            selected={
              i === currentAnim[0] || i === currentAnim[2] ? true : false
            }
            section={
              i >= currentSection[0] && i <= currentSection[1] ? true : false
              // false
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
