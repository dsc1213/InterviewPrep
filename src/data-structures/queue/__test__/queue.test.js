import Queue from '../queue';

describe( 'Queue', () => {
  it( 'Init a Queue', () => {
    const queue = new Queue();

    expect( queue ).not.toBeNull();
    expect( queue.length ).toStrictEqual( 0 );
  } );

  it( 'Enqueuing a queue', () => {
    const queue = new Queue();

    queue.enqueue( 1 );

    expect( queue.peek() ).toStrictEqual( 1 );

    queue.enqueue( 2 );

    expect( queue.peek() ).toStrictEqual( 1 );
  } )

  it( 'Dequeuing a queue', () => {
    const queue = new Queue();

    queue.enqueue( 1 );
    queue.enqueue( 2 );
    queue.dequeue();

    expect( queue.peek() ).toStrictEqual( 2 );
  } )

  it( 'Dequeuing an empty queue', () => {
    const queue = new Queue();

    queue.enqueue( 1 );
    queue.enqueue( 2 );
    queue.dequeue();
    queue.dequeue();

    expect( queue.dequeue() ).toBeNull();
  } )

  it( 'Peek a queue', () => {
    const queue = new Queue();

    queue.enqueue( 1 );
    queue.enqueue( 2 );
    queue.dequeue();
    queue.enqueue( 3 );
    queue.dequeue();
    queue.dequeue();
    queue.enqueue( 4 );
    queue.enqueue( 5 );

    expect( queue.peek() ).toStrictEqual( 4 );
  } )

  it( 'Peek an empty queue', () => {
    const queue = new Queue();

    queue.enqueue( 1 );
    queue.enqueue( 2 );
    queue.dequeue();
    queue.dequeue();

    expect( queue.peek() ).toBeNull();
  } )
} );