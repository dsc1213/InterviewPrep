// Counting Sort: https://medium.com/basecs/counting-linearly-with-counting-sort-cd8516ae09b3

// Notice that we needed to know the max/min value in order to use
// counting sort at all!
const countingSort = ( array, minValue, maxValue ) => {

  // Count the instances of each element.
  const count = new Array( maxValue - minValue + 1 ).fill( 0 );

  // We now have a placeholder array that we'll use to keep
  // track of which element will be sorted into each index.
  console.log( 'count: ', count );

  // Build up our index count array.
  for ( let i = 0; i < array.length; i++ ) {
    count[array[i]]++;
  }

  // Populated count array
  console.log( 'count: ', count );

  // Modify array and move elements into their sorted location.
  for ( let i = minValue, z = 0; i <= maxValue; i++ ) {
    while ( count[i]-- > 0 ) {
      console.log( `item at index ${z} is: ${array[z]}` );

      array[z++] = i;

      console.log( `moving item ${i} to correct location` );
    }
  }

  console.log( 'sorted array: ', array );

  return array;
};

const arr = [9,4,1,7,9,1,2,0];
countingSort( arr, 0, 9 );