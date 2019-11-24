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

    expect( ll.search( 3 ).value ).toStrictEqual( 3 );
  } );

  it( 'Search in a linked list, value not present', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.prepend( 2 );
    ll.add( 3 );

    expect( ll.search( 4 ) ).toBeNull();
  } );

  it( 'Delete from an empty linked list', () => {
    const ll = new LinkedList();

    expect( ll.delete( 1 ) ).toStrictEqual( 0 );
  } );

  it( 'Delete a non-existent entry from a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );

    expect( ll.delete( 3 ) ).toStrictEqual( 0 );
  } );

  it( 'Delete from a linked list with only one element', () => {
    const ll = new LinkedList();

    ll.add( 1 );

    expect( ll.delete( 1 ) ).toStrictEqual( 1 );
    expect( ll.head ).toBeNull();
    expect( ll.tail ).toBeNull();
  } );

  it( 'Delete from a linked list with more than one element', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 2 );
    ll.add( 3 );
    ll.add( 2 );


    expect( ll.delete( 2 ) ).toStrictEqual( 3 );
    expect( ll.head.value ).toStrictEqual( 1 );
    expect( ll.head.next.value ).toStrictEqual( 3 );
  } );

  it( 'Delete tail from a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    expect( ll.deleteTail().value ).toStrictEqual( 3 );
    expect( ll.head.value ).toStrictEqual( 1 );
    expect( ll.tail.value ).toStrictEqual( 2 );
  } );

  it( 'Delete tail from a linked list, only one node', () => {
    const ll = new LinkedList();

    ll.add( 1 );

    expect( ll.deleteTail().value ).toStrictEqual( 1 );
    expect( ll.head ).toBeNull();
    expect( ll.tail ).toBeNull();
  } );

  it( 'Delete head from a linked list', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    expect( ll.deleteHead().value ).toStrictEqual( 1 );
    expect( ll.head.value ).toStrictEqual( 2 );
    expect( ll.tail.value ).toStrictEqual( 3 );
  } );

  it( 'Delete head from an empty linked list', () => {
    const ll = new LinkedList();

    expect( ll.deleteHead() ).toBeNull();
  } );

  it( 'Delete head from a linked list, only one node', () => {
    const ll = new LinkedList();

    ll.add( 1 );

    expect( ll.deleteHead().value ).toStrictEqual( 1 );
    expect( ll.head ).toBeNull();
    expect( ll.tail ).toBeNull();
  } );

  it( 'fromArray', () => {
    const ll = new LinkedList();

    const arr = [1, 2, 3];

    ll.fromArray( arr );

    expect( ll.head.value ).toStrictEqual( 1 );
    expect( ll.head.next.value ).toStrictEqual( 2 );
    expect( ll.head.next.next.value ).toStrictEqual( 3 );
  } );

  it( 'toArray', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    const result = ll.toArray();

    expect( result.length ).toStrictEqual( 3 );
    expect( result[0] ).toStrictEqual( 1 );
    expect( result[1] ).toStrictEqual( 2 );
    expect( result[2] ).toStrictEqual( 3 );
  } );

  it( 'toString', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    expect( ll.toString() ).toStrictEqual( '1,2,3' );
  } );

  it( 'reverse', () => {
    const ll = new LinkedList();

    ll.add( 1 );
    ll.add( 2 );
    ll.add( 3 );

    ll.reverse()

    expect( ll.head.value ).toStrictEqual( 3 );
    expect( ll.head.next.value ).toStrictEqual( 2 );
    expect( ll.head.next.next.value ).toStrictEqual( 1 );
    expect( ll.tail.value ).toStrictEqual( 1 );
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