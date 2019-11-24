import { isNullOrUndefined } from '../../helpers/type-of';
import Comparer from '../../helpers/comparer';

class Node {
  constructor( value, next = null ) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor( compareFn ) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparer( compareFn );
  }

  add = value => {
    const newNode = new Node( value );

    let h = this.head;
    let t = this.tail;

    if ( isNullOrUndefined( h ) ) {
      h = newNode;
      t = newNode;
    } else {
      t.next = newNode;
      t = newNode;
    }

    this.head = h;
    this.tail = t;
  }

  prepend = value => {
    let h = this.head;
    let t = this.tail;
    
    const newNode = new Node( value );
    newNode.next = h;
    h = newNode;

    if ( isNullOrUndefined( t ) ) {
      t = newNode;
    }

    this.head = h;
    this.tail = t;
  }

  search = value => {
    const { head } = this;
    let currNode = head;

    while ( !isNullOrUndefined( currNode ) ) {

      if ( this.compare.equal( currNode.value, value ) ) {
        return currNode;
      }

      currNode = currNode.next;
    }

    return null;
  }

  delete = value => {
    let numNodesDeleted = 0;
    if ( isNullOrUndefined( this.head ) ) return numNodesDeleted;

    while ( !isNullOrUndefined( this.head ) && this.compare.equal( this.head.value, value ) ) {
      numNodesDeleted++;
      this.head = this.head.next;
    }

    let currNode = this.head; // At this point, we know that h.value !== value

    if ( !isNullOrUndefined( currNode ) ) {
      while ( !isNullOrUndefined( currNode.next ) ) {
        if ( this.compare.equal( currNode.next.value, value ) ) {
          numNodesDeleted++;
          currNode.next = currNode.next.next;
        } else {
          currNode = currNode.next;
        }
      }
    }

    if ( this.compare.equal( this.tail.value, value ) ) {
      // the tail node was already deleted in the above while loop. We need to just reassign the tail here
      if ( isNullOrUndefined( this.head ) || isNullOrUndefined( this.head.next ) ) {
        this.tail = this.head;
      } else {
        this.tail = currNode;
      }
    }

    return numNodesDeleted;
  }

  deleteTail = () => {
    const deletedTail = this.tail;

    if ( isNullOrUndefined( this.head ) || ( this.head === this.tail ) ) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currNode = this.head;

    while ( currNode.next !== deletedTail ) {
      currNode = currNode.next;
    }

    currNode.next = null;
    this.tail = currNode;

    return deletedTail;
  }

  deleteHead = () => {
    if ( isNullOrUndefined( this.head ) ) return null;

    let h = this.head;
    let t = this.tail;
    const deletedHead = h;

    if ( !isNullOrUndefined( h.next ) ) {
      h = h.next
    } else {
      h = null;
      t = null;
    }

    this.head = h;
    this.tail = t;

    return deletedHead;
  }

  fromArray = values => values.forEach( v => this.add( v ) );

  toArray = () => {
    const nodes = [];

    let currNode = this.head;

    while ( !isNullOrUndefined( currNode ) ) {
      nodes.push( currNode.value );
      currNode = currNode.next;
    }

    return nodes;
  }

  toString = cb => this.toArray().map( n => n.toString( cb ) ).toString();

  reverse = () => {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while ( currNode ) {
      nextNode = currNode.next;
      currNode.next = prevNode; // This is where the reversing happens
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
  }

  traverse = () => {
    let node = this.head;

    const result = [];

    while ( !isNullOrUndefined( node ) ) {
      result.push( node.value );

      node = node.next;
    }

    return result;
  }

  traverseInReverse = node => {
    if ( isNullOrUndefined( node ) ) return [];
    else {
      let retArr = this.traverseInReverse( node.next );

      return [...retArr, node.value];
    }
  }
}

export default LinkedList;