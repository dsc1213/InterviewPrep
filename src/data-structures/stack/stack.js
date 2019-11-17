class Stack {
  constructor() {
    this._stack = [];
  }

  push = ele => {
    // this._stack.push( ele );

    this._stack = [...this._stack, ele];
  }

  pop = () => {
    // this._stack.pop()

    if ( this._stack.length <= 0 ) return null;

    const removedElement = this._stack[this._stack.length - 1];
    this._stack.splice( this._stack.length - 1 );

    return removedElement;
  }

  peek = () => {
    if ( this._stack.length <= 0 ) return null;

    return this._stack[this._stack.length - 1];
  }
}

export default Stack;