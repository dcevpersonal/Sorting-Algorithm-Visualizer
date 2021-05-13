// Interface

interface animations {
  swap: Array<Array<number>>;
  section: Array<Array<number>>;
}

// Algorithm

export const partition = (
  arr: Array<number>,
  start: number,
  end: number,
  animations: animations
) => {
  const pivotValue = arr[end];
  let pivotPos = start;

  for (let i = start; i < end; i++) {
    animations.section.push([start, end]);

    if (arr[i] < pivotValue) {
      animations.swap.push([i, arr[pivotPos], pivotPos, arr[i]]);

      [arr[i], arr[pivotPos]] = [arr[pivotPos], arr[i]];

      pivotPos++;
    } else {
      animations.swap.push([NaN, NaN]);
    }
  }
  animations.section.push([start, end]);
  animations.swap.push([end, arr[pivotPos], pivotPos, arr[end]]);

  [arr[end], arr[pivotPos]] = [arr[pivotPos], arr[end]];

  return pivotPos;
};

export const quickSortRecursive = (
  arr: Array<number>,
  start: number,
  end: number
) => {
  const animations = {
    swap: [],
    section: [],
  };

  if (start >= end) {
    return;
  }

  const pivotPos = partition(arr, start, end, animations);

  quickSortRecursive(arr, start, pivotPos - 1);
  quickSortRecursive(arr, pivotPos + 1, end);
};

export const quickSortIterative = (arr: Array<number>) => {
  let partitionInd = 0;
  const arrStack = [0, arr.length - 1];

  const animations: animations = {
    swap: [],
    section: [],
  };

  while (arrStack[arrStack.length - 1] >= 0) {
    const end = arrStack.pop() || 0;
    const start = arrStack.pop() || 0;

    partitionInd = partition(arr, start, end, animations);

    if (partitionInd - 1 > start) {
      arrStack.push(start);
      arrStack.push(partitionInd - 1);
    }

    if (partitionInd + 1 < end) {
      arrStack.push(partitionInd + 1);
      arrStack.push(end);
    }
  }
  return animations;
};
