// Interface

interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

// Algorithm

const heapify = (
  arr: Array<number>,
  arrLength: number,
  largestValueIndex: number,
  animations: animations
): Array<number> => {
  let largestIndex = largestValueIndex;
  const leftIndex = largestIndex * 2 + 1;
  const rightIndex = leftIndex + 1;

  if (leftIndex < arrLength && arr[leftIndex] > arr[largestIndex]) {
    largestIndex = leftIndex;
  }
  if (rightIndex < arrLength && arr[rightIndex] > arr[largestIndex]) {
    largestIndex = rightIndex;
  }
  if (largestIndex !== largestValueIndex) {
    animations.swap.push([
      largestValueIndex,
      arr[largestIndex],
      largestIndex,
      arr[largestValueIndex],
    ]);
    animations.section.push([0, arrLength]);
    [arr[largestValueIndex], arr[largestIndex]] = [
      arr[largestIndex],
      arr[largestValueIndex],
    ];

    heapify(arr, arrLength, largestIndex, animations);
  }
  return arr;
};

export const heapSort = (arr: Array<number>) => {
  const arrLength = arr.length;
  let lastParentIndex = Math.floor(arrLength / 2 - 1);
  let lastChildIndex = arrLength - 1;
  const animations: animations = {
    swap: [],
    section: [],
  };
  while (lastParentIndex >= 0) {
    heapify(arr, arrLength, lastParentIndex, animations);
    lastParentIndex--;
  }

  while (lastChildIndex >= 0) {
    animations.swap.push([0, arr[lastChildIndex], lastChildIndex, arr[0]]);
    animations.section.push([0, arrLength]);
    [arr[0], arr[lastChildIndex]] = [arr[lastChildIndex], arr[0]];
    heapify(arr, lastChildIndex, 0, animations);
    lastChildIndex--;
  }
  return animations;
};
