import LinkedList from '../linked-list';

describe( 'Linked List', () => {
  it( 'Init a linked list', () => {
    const ll = new LinkedList();

    expect( ll ).toBeInstanceOf( LinkedList );
    expect( ll.head ).toBeNull();
    expect( ll.tail ).toBeNull();
  } )

  it( 'Adding to a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );

    expect( ll.head.value ).toStrictEqual( 1 );
    expect( ll.head.next.value ).toStrictEqual( 2 );
    expect( ll.tail.value ).toStrictEqual( 2 );
  } )

  it( 'Prepending to a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.prepend( 2 );
    ll.add( 3 );

    expect( ll.head.value ).toStrictEqual( 2 );
    expect( ll.head.next.value ).toStrictEqual( 1 );
    expect( ll.tail.value ).toStrictEqual( 3 );
  } );

  it( 'Prepending to an empty linked list', () => {
    const ll = new LinkedList();

    ll.prepend( 2 );

    expect( ll.head.value ).toStrictEqual( 2 );
    expect( ll.tail.value ).toStrictEqual( 2 );
  } );

  it( 'Search in a linked list, value present', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.prepend( 2 );
    ll.add( 3 );

    expect( ll.search( 3 ) ).toBeTruthy();
  } );

  it( 'Search in a linked list, value not present', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.prepend( 2 );
    ll.add( 3 );

    expect( ll.search( 4 ) ).toBeFalsy();
  } );

  it( 'Delete from an empty linked list', () => {
    const ll = new LinkedList();

    expect( ll.delete( 1 ) ).toBeFalsy();
  } );

  it( 'Delete a non-existent entry from a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );

    expect( ll.delete( 3 ) ).toBeFalsy();
  } );

  it( 'Delete from a linked list with only one element', () => {
    const ll = new LinkedList();

    ll.add( 1 );

    expect( ll.delete( 1 ) ).toBeTruthy();
    expect( ll.head ).toBeNull();
    expect( ll.tail ).toBeNull();
  } );

  it( 'Delete from a linked list with more than one element', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );


    expect( ll.delete( 2 ) ).toBeTruthy();
    expect( ll.head.value ).toStrictEqual( 1 );
    expect( ll.head.next.value ).toStrictEqual( 3 );

    const ll1 = new LinkedList();

    ll1.add( 1 );
    ll1.add( 2 );
    ll1.add( 3 );

    expect( ll1.delete( 3 ) ).toBeTruthy();
    expect( ll1.head.value ).toStrictEqual( 1 );
    expect( ll1.head.next.value ).toStrictEqual( 2 );
  } );

  it( 'Traversal', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    const result = ll.traverse( ll.head );

    expect( result[0] ).toStrictEqual( ll.head.value );
    expect( result[1] ).toStrictEqual( ll.head.next.value );
    expect( result[2] ).toStrictEqual( ll.tail.value );
  } );
  
  it( 'Reverse traversal', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    const result = ll.traverseInReverse( ll.head );

    expect( result[0] ).toStrictEqual( ll.tail.value );
    expect( result[1] ).toStrictEqual( ll.head.next.value );
    expect( result[2] ).toStrictEqual( ll.head.value );
  } );
} );