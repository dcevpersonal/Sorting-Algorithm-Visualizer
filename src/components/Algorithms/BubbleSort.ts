// Interface

interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

// Algorithm

export const bubbleSort = (arr: Array<number>) => {
  const arrLength = arr.length;
  let check;
  const animations: animations = {
    swap: [],
    section: [],
  };
  do {
    check = false;
    for (let i = 0; i < arrLength; i++) {
      if (arr[i] > arr[i + 1]) {
        check = true;
        animations.swap.push([i, arr[i + 1], i + 1, arr[i]]);
        animations.section.push([i, arrLength]);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
      animations.swap.push([0, 0, 0, 0]);
      animations.section.push([i, arrLength]);
    }
  } while (check);

  return animations;
};
