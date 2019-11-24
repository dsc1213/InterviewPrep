class Comparer {
  constructor( compareFn ) {
    this.compare = compareFn || Comparer.defaultCompareFn;
  }

  static defaultCompareFn = ( a, b ) => {
    if ( a === b ) return 0;

    return a > b ? 1 : -1;
  }

  equal = ( a, b ) => this.compare( a, b ) === 0;

  lessThan = ( a, b ) => this.compare( a, b ) < 0;

  greaterThan = ( a, b ) => this.compare( a, b ) > 0;

  lessThanOrEqual = ( a, b ) => this.lessThan( a, b ) || this.equal( a, b );

  greaterThanOrEqual = ( a, b ) => this.greaterThan( a, b ) || this.equal( a, b );

  reverse = () => {
    const compareOriginal = this.compare;

    this.compare = ( a, b ) => compareOriginal( b, a );
  }
}

export default Comparer;