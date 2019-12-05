// Part 1: https://medium.com/basecs/learning-to-love-heaps-cef2b273a238
// Part 2: https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82

const swap = ( array, firstItemIndex, lastItemIndex ) => {
  let temp = array[firstItemIndex];

  // Swap first and last items in the array.
  array[firstItemIndex] = array[lastItemIndex];
  array[lastItemIndex] = temp;
};

const heapify = ( heap, i, max ) => {
  let index, leftChild, rightChild;

  while ( i < max ) {
    index = i;

    leftChild = 2 * i + 1;
    rightChild = leftChild + 1;

    if ( leftChild < max && heap[leftChild] > heap[index] ) {
      index = leftChild;
    }

    if ( rightChild < max && heap[rightChild] > heap[index] ) {
      index = rightChild;
    }

    if ( index === i ) return;

    swap( heap, i, index );

    i = index;
  }
};

const buildMaxHeap = array => {
  let i = Math.floor( ( array.length / 2 ) - 1 );

  // Build a max heap out of
  // all array elements passed in.
  while ( i >= 0 ) {
    heapify( array, i, array.length );

    i -= 1;
  }
};

const heapSort = array => {
  // Build out max heap
  buildMaxHeap( array );

  console.log( 'Build max heap: ', array );

  // Find last element
  let lastElement = array.length - 1;

  // Continue heap sorting until we have
  // just one element left in the array.
  while ( lastElement > 0 ) {
    swap( array, 0, lastElement );

    console.log( 'After swap: ', array );

    heapify( array, 0, lastElement );

    console.log( 'After heapify: ', array );

    lastElement -= 1;
  }
};

let arr = [3, 1, 9, 5, 15, 2, 17, 9];
heapSort( arr );
console.log( arr );