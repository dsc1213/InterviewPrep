import { isNullOrUndefined } from '../../helpers/type-of';

class Node {
  constructor( value ) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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
    let node = head;

    while ( !isNullOrUndefined( node ) && node.value !== value ) {
      node = node.next;
    }

    if ( isNullOrUndefined( node ) ) {
      return false;
    }

    return true;
  }

  delete = value => {
    let h = this.head;
    let t = this.tail;
    if ( isNullOrUndefined( h ) ) return false;

    let node = h;

    if ( node.value === value ) {
      if ( h === t ) {
        t = null;
      }

      h = h.next;

      this.head = h;
      this.tail = t;

      return true;
    }

    while ( node.next !== null && node.next.value !== value ) {
      node = node.next;
    }

    if ( node.next !== null ) {
      if ( node.next === t ) {
        t = node;
      }
      node.next = node.next.next;

      this.head = h;
      this.tail = t;

      return true;
    }

    this.head = h;
    this.tail = t;

    return false;
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