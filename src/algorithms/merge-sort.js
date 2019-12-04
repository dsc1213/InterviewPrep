// Part 1: https://medium.com/basecs/making-sense-of-merge-sort-part-1-49649a143478
// Part 2: https://medium.com/basecs/making-sense-of-merge-sort-part-2-be8706453209

const merge = ( leftArray, rightArray, array ) => {
  let index = 0;

  while ( leftArray.length && rightArray.length ) {
    console.log( 'array is: ', array );
    if ( rightArray[0] < leftArray[0] ) {
      array[index++] = rightArray.shift();
    } else {
      array[index++] = leftArray.shift();
    }
  }

  while ( leftArray.length ) {
    console.log( 'left array is: ', leftArray );
    array[index++] = leftArray.shift();
  }

  while ( rightArray.length ) {
    console.log( 'right array is: ', rightArray );
    array[index++] = rightArray.shift();
  }

  console.log( '** end of merge function ** array list is: ', array );
};

const mergeSort = array => {
  // Determine the size of the array
  const arraySize = array.length;

  // If array being passed in has only one element
  // within it, it is considered to be a sorted array
  if ( arraySize === 1 ) return;

  // If array contains more than one element,
  // split it into two parts (left and right arrays).
  const mid = Math.floor( arraySize / 2 );
  const leftArray = array.slice( 0, mid );
  const rightArray = array.slice( mid );

  // Recursively call mergeSort() on leftArray
  // and rightArray sublists
  mergeSort( leftArray );
  mergeSort( rightArray );

  // After the mergeSort functions above finish executing,
  // merge the sorted leftArray and rightArray together.
  merge( leftArray, rightArray, array );

  // Return the fully sorted array
  return array;
}

mergeSort( [5, 1, 7, 3, 2, 8, 6, 4] );