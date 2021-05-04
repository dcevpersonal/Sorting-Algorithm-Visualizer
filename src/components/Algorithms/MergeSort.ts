interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

const shiftCheck = (array: Array<number>): number => {
  const shiftValue = array.shift();
  if (shiftValue === undefined) {
    return NaN;
  } else {
    return shiftValue;
  }
};

const merge = (
  left: Array<number>,
  right: Array<number>,
  copyArray: Array<number>,
  animations: animations
): Array<number> => {
  const arr = [];
  const indexArr: Array<number> = [];
  const leftCopy = left.slice(0);
  const rightCopy = right.slice(0);

  for (const i of left) {
    indexArr.push(copyArray.indexOf(i));
  }

  for (const i of right) {
    indexArr.push(copyArray.indexOf(i));
  }

  const section = [indexArr[0], indexArr[indexArr.length - 1]];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      animations.swap.push([
        indexArr[0],
        left[0],
        copyArray.indexOf(left[0]),
        copyArray[indexArr[0]],
      ]);
      copyArray[copyArray.indexOf(left[0])] = copyArray[indexArr[0]];
      copyArray[shiftCheck(indexArr)] = left[0];
      arr.push(shiftCheck(left));
      leftCopy.shift();
    } else {
      animations.swap.push([
        indexArr[0],
        right[0],
        copyArray.indexOf(right[0]),
        copyArray[indexArr[0]],
      ]);

      copyArray[copyArray.indexOf(right[0])] = copyArray[indexArr[0]];
      copyArray[shiftCheck(indexArr)] = right[0];
      arr.push(shiftCheck(right));
      rightCopy.shift();
    }
    animations.section.push(section);
  }

  while (indexArr.length) {
    if (leftCopy.length) {
      animations.swap.push([
        indexArr[0],
        leftCopy[0],
        copyArray.indexOf(leftCopy[0]),
        copyArray[indexArr[0]],
      ]);
      copyArray[copyArray.indexOf(leftCopy[0])] = copyArray[indexArr[0]];
      copyArray[shiftCheck(indexArr)] = shiftCheck(leftCopy);
    } else {
      animations.swap.push([
        indexArr[0],
        rightCopy[0],
        copyArray.indexOf(rightCopy[0]),
        copyArray[indexArr[0]],
      ]);
      copyArray[copyArray.indexOf(rightCopy[0])] = copyArray[indexArr[0]];
      copyArray[shiftCheck(indexArr)] = shiftCheck(rightCopy);
    }
    animations.section.push(section);
  }

  return [...arr, ...left, ...right];
};

export const mergeSortAlg = (
  array: Array<number>,
  copyArray: Array<number>,
  animations: animations
): Array<number> => {
  const half = array.length / 2;
  if (array.length < 2) {
    return array;
  }
  const left = array.splice(0, half);

  return merge(
    mergeSortAlg(left, copyArray, animations),
    mergeSortAlg(array, copyArray, animations),
    copyArray,
    animations
  );
};

export const mergeSort = (array: Array<number>) => {
  const copyArray = array.slice(0);
  const animations: animations = {
    swap: [],
    section: [],
  };
  mergeSortAlg(array, copyArray, animations);
  return animations;
};
