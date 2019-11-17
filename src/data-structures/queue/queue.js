class Queue {
  constructor() {
    this._queue = [];
  }

  get length() {
    return this._queue.length;
  }

  enqueue = ele => {
    this._queue = [...this._queue, ele];
  }

  dequeue = () => {
    if ( this.length <= 0 ) return null;
    const removedElement = this._queue[0];

    this._queue = this._queue.slice( 1 );

    return removedElement;
  }

  peek = () => {
    if ( this.length <= 0 ) return null;

    return this._queue[0];
  }
}

export default Queue;