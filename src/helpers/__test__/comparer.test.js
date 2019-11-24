import Comparer from '../comparer';

describe( 'Comparer', () => {
  it( 'Init', () => {
    const comparer = new Comparer();

    expect( comparer ).toBeInstanceOf( Comparer );
  } );

  it( 'equal', () => {
    const comparer = new Comparer();

    expect( comparer.equal( 1, 2 ) ).toBeFalsy();
    expect( comparer.equal( 3, 3 ) ).toBeTruthy();
  } );

  it( 'lessThan', () => {
    const comparer = new Comparer();

    expect( comparer.lessThan( 1, 2 ) ).toBeTruthy();
    expect( comparer.lessThan( 3, 3 ) ).toBeFalsy();
  } );

  it( 'lessThanOrEqual', () => {
    const comparer = new Comparer();

    expect( comparer.lessThanOrEqual( 1, 2 ) ).toBeTruthy();
    expect( comparer.lessThanOrEqual( 3, 3 ) ).toBeTruthy();
    expect( comparer.lessThanOrEqual( 3, 2 ) ).toBeFalsy();
  } );

  it( 'greaterThan', () => {
    const comparer = new Comparer();

    expect( comparer.greaterThan( 1, 2 ) ).toBeFalsy();
    expect( comparer.greaterThan( 3, 2 ) ).toBeTruthy();
  } );

  it( 'greaterThanOrEqual', () => {
    const comparer = new Comparer();

    expect( comparer.greaterThanOrEqual( 1, 2 ) ).toBeFalsy();
    expect( comparer.greaterThanOrEqual( 3, 3 ) ).toBeTruthy();
    expect( comparer.greaterThanOrEqual( 3, 2 ) ).toBeTruthy();
  } );

  it( 'Custom comparerFn', () => {
    const comparer = new Comparer( ( a, b ) => {
      if ( a.val === b.val ) return 0;

      return a.val > b.val ? 1 : -1;
    } );

    expect( comparer.equal( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.equal( { val: 3 }, { val: 3 } ) ).toBeTruthy();

    expect( comparer.lessThan( { val: 1 }, { val: 2 } ) ).toBeTruthy();
    expect( comparer.lessThan( { val: 3 }, { val: 3 } ) ).toBeFalsy();

    expect( comparer.lessThanOrEqual( { val: 1 }, { val: 2 } ) ).toBeTruthy();
    expect( comparer.lessThanOrEqual( { val: 3 }, { val: 3 } ) ).toBeTruthy();
    expect( comparer.lessThanOrEqual( { val: 3 }, { val: 2 } ) ).toBeFalsy();

    expect( comparer.greaterThan( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.greaterThan( { val: 3 }, { val: 2 } ) ).toBeTruthy();

    expect( comparer.greaterThanOrEqual( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.greaterThanOrEqual( { val: 3 }, { val: 3 } ) ).toBeTruthy();
    expect( comparer.greaterThanOrEqual( { val: 3 }, { val: 2 } ) ).toBeTruthy();
  } );

  it( 'reverse', () => {
    const comparer = new Comparer( ( a, b ) => {
      if ( a.val === b.val ) return 0;

      return a.val > b.val ? 1 : -1;
    } );

    comparer.reverse();

    expect( comparer.equal( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.equal( { val: 3 }, { val: 3 } ) ).toBeTruthy();

    expect( comparer.lessThan( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.lessThan( { val: 3 }, { val: 3 } ) ).toBeFalsy();

    expect( comparer.lessThanOrEqual( { val: 1 }, { val: 2 } ) ).toBeFalsy();
    expect( comparer.lessThanOrEqual( { val: 3 }, { val: 3 } ) ).toBeTruthy();
    expect( comparer.lessThanOrEqual( { val: 3 }, { val: 2 } ) ).toBeTruthy();

    expect( comparer.greaterThan( { val: 1 }, { val: 2 } ) ).toBeTruthy();
    expect( comparer.greaterThan( { val: 3 }, { val: 2 } ) ).toBeFalsy();

    expect( comparer.greaterThanOrEqual( { val: 1 }, { val: 2 } ) ).toBeTruthy();
    expect( comparer.greaterThanOrEqual( { val: 3 }, { val: 3 } ) ).toBeTruthy();
    expect( comparer.greaterThanOrEqual( { val: 3 }, { val: 2 } ) ).toBeFalsy();
  } );
} );