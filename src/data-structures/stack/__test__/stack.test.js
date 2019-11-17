import Stack from '../stack';

describe( "Stack", () => {
  it( "Should create an empty stack", () => {
    const stack = new Stack();

    expect( stack ).not.toBeNull();
    expect( stack._stack ).not.toBeNull();
  } );

  it( "Push to the stack", () => {
    const stack = new Stack();

    stack.push( 1 );

    expect( stack.peek() ).toStrictEqual( 1 );
  } );

  it( "Pop from the stack", () => {
    const stack = new Stack();

    stack.push( 1 );
    stack.push( 2 );
    stack.push( 3 );

    expect( stack.pop() ).toStrictEqual( 3 );
    expect( stack.peek() ).toStrictEqual( 2 );
  } );

  it( "Pop from an empty stack", () => {
    const stack = new Stack();

    stack.push( 1 );
    stack.pop();
    
    expect( stack.pop() ).toBeNull();
  } );

  it( "Peek at the top of stack", () => {
    const stack = new Stack();

    stack.push( 1 );
    stack.push( 2 );
    stack.pop();
    stack.push( 3 );
    stack.pop();
    stack.pop();
    stack.push( 4 );

    expect( stack.peek() ).toStrictEqual( 4 );
  } );

  it( "Pop at an empty stack", () => {
    const stack = new Stack();

    stack.push( 1 );
    stack.pop();
    
    expect( stack.peek() ).toBeNull();
  } );
} )