import React, { useState, useRef, useEffect } from "react";
import Style from "./Grid.module.scss";
import Key from "./Key";

import { quickSortIterative } from "../Algorithms/QuickSort";
import { heapSort } from "../Algorithms/HeapSort";
import { mergeSort } from "../Algorithms/MergeSort";
import { bubbleSort } from "../Algorithms/BubbleSort";

// Interfaces

interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

interface props {
  startSort: boolean;
  setSortRunningF(value: boolean): void;
  sortRunning: boolean;
  selectAlgorithm: number;
  selectSpeed: number;
  selectSize: number;
  startGenerateArray: boolean;
}

function Grid(props: props) {
  // Generation Functions

  const generateArray = () => {
    const array: Array<number> = [];
    for (let i = 0; i < keysSize; i++) {
      let number = Math.floor(Math.random() * (keysSize + 10 - 5) + 5);
      if (array.includes(number)) {
        number = Math.floor(Math.random() * (keysSize - 10 - 5) + 5);
        i--;
      } else {
        array.push(number);
      }
    }
    return array;
  };

  const regenerateArray = () => {
    setKeys(() => {
      return generateArray();
    });
    setCurrentSection([0, keysSize]);
    setIsSorted(false);
    setCurrentFrame(0);
  };

  // Animation Function Functions

  const startSorting = () => {
    props.setSortRunningF(true);
    if (isSorted) {
      props.setSortRunningF(false);
    }

    setAnim(() => {
      const arr = keys.slice(0);
      let animations;
      if (props.selectAlgorithm === 0) {
        animations = quickSortIterative(arr);
      } else if (props.selectAlgorithm === 1) {
        animations = mergeSort(arr);
      } else if (props.selectAlgorithm === 2) {
        animations = heapSort(arr);
      } else if (props.selectAlgorithm === 3) {
        animations = bubbleSort(arr);
      } else {
        animations = quickSortIterative(arr);
      }
      animations.swap.push([NaN, NaN, NaN, NaN]);
      animations.section.push([0, keysSize]);
      return animations;
    });

    setIsSorted(true);
  };

  const startAnimate = () => {
    if (currentFrameRef.current > animRef.current.swap.length - 1) {
      props.setSortRunningF(false);
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

    setTimeout(startAnimate, props.selectSpeed);
  };

  // Render Values
  const [firstRender, setFirstRender] = useState(false);

  // Keys Values
  const [keysSize, setKeysSize] = useState(150);
  const [keys, setKeys] = useState(() => {
    return generateArray();
  });
  const [keysModif, setKeysModif] = useState(() => {
    const array = keys.slice(0);
    return array;
  });

  // Animations Values
  const [anim, setAnim] = useState(() => {
    const animations: animations = {
      swap: [],
      section: [],
    };
    return animations;
  });

  const animRef = useRef(anim);
  animRef.current = anim;

  // Current Animations Values
  const [currentAnim, setCurrentAnim] = useState([NaN, NaN, NaN, NaN]);
  const [currentFrame, setCurrentFrame] = useState(NaN);

  const currentFrameRef = useRef(currentFrame);
  currentFrameRef.current = currentFrame;

  const [currentSection, setCurrentSection] = useState([0, keysSize]);

  // Sort Values
  const [isSorted, setIsSorted] = useState(false);

  // Effects
  useEffect(() => {
    if (isSorted) {
      startAnimate();
    }
  }, [isSorted]);

  useEffect(() => {
    if (firstRender && !props.sortRunning) {
      startSorting();
    }
    setFirstRender(true);
  }, [props.startSort]);

  useEffect(() => {
    if (!props.sortRunning) {
      regenerateArray();
    }
  }, [props.startGenerateArray]);

  useEffect(() => {
    if (!props.sortRunning) {
      setKeysSize(props.selectSize);
    }
  }, [props.selectSize]);

  useEffect(() => {
    if (!props.sortRunning) {
      regenerateArray();
    }
  }, [keysSize]);

  useEffect(() => {
    setKeysModif(() => {
      const array = keys.slice(0);
      return array;
    });
  }, [keys]);

  return (
    <div className={Style.Grid}>
      <div className={Style.Grid_Container}>
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
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Grid);
