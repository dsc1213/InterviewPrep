import { isNullOrUndefined } from '../../../helpers/type-of';

class Node {
  constructor( value ) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  Insert = value => {
    if ( isNullOrUndefined( this.root ) ) {
      this.root = new Node( value );
    } else {
      this._InsertNode( this.root, value );
    }
  }

  _InsertNode = ( currentNode, value ) => {
    if ( value < currentNode.value ) {
      if ( isNullOrUndefined( currentNode.left ) ) {
        currentNode.left = new Node( value );
      } else {
        this._InsertNode( currentNode.left, value );
      }
    } else {
      if ( isNullOrUndefined( currentNode.right ) ) {
        currentNode.right = new Node( value );
      } else {
        this._InsertNode( currentNode.right, value );
      }
    }
  }

  Search = ( currentNode, value ) => {
    if ( isNullOrUndefined( currentNode ) ) {
      return false;
    }

    if ( currentNode.value === value ) {
      return true;
    } else if ( currentNode.value < value ) {
      return this.Search( currentNode.right, value );
    } else {
      return this.Search( currentNode.left, value );
    }
  }

  FindParent = ( currentNode, value ) => {
    if ( value === currentNode.value ) {
      return null;
    } else if ( value < currentNode.value ) {
      if ( isNullOrUndefined( currentNode.left ) ) {
        return null;
      } else if ( currentNode.left.value === value ) {
        return currentNode;
      } else {
        return this.FindParent( currentNode.left, value );
      }
    } else {
      if ( isNullOrUndefined( currentNode.right ) ) {
        return null;
      } else if ( currentNode.right.value === value ) {
        return currentNode;
      } else {
        return this.FindParent( currentNode.right, value );
      }
    }
  }

  FindNode = ( currentNode, value ) => {
    if ( isNullOrUndefined( currentNode ) ) {
      return null;
    } else if ( currentNode.value === value ) {
      return currentNode;
    } else if ( value < currentNode.value ) {
      return this.FindNode( currentNode.left, value );
    } else {
      return this.FindNode( currentNode.right, value );
    }
  }

  FindMinimum = currentNode => {
    if ( isNullOrUndefined( currentNode ) ) {
      return null;
    } else if ( isNullOrUndefined( currentNode.left ) ) {
      return currentNode.value;
    } else {
      return this.FindMinimum( currentNode.left );
    }
  }

  FindMaximum = currentNode => {
    if ( isNullOrUndefined( currentNode ) ) {
      return null;
    } else if ( isNullOrUndefined( currentNode.right ) ) {
      return currentNode.value;
    } else {
      return this.FindMaximum( currentNode.right );
    }
  }

  InOrderTrav = ( currentNode, result = [] ) => {
    if ( !isNullOrUndefined( currentNode ) ) {
      result = this.InOrderTrav( currentNode.left, result );
      result.push( currentNode.value );
      result = this.InOrderTrav( currentNode.right, result );
    }

    return result;
  }

  PreOrderTrav = ( currentNode, result = [] ) => {
    if ( !isNullOrUndefined( currentNode ) ) {
      result.push( currentNode.value );
      result = this.PreOrderTrav( currentNode.left, result );
      result = this.PreOrderTrav( currentNode.right, result );
    }

    return result;
  }

  PostOrderTrav = ( currentNode, result = [] ) => {
    if ( !isNullOrUndefined( currentNode ) ) {
      result = this.PostOrderTrav( currentNode.left, result );
      result = this.PostOrderTrav( currentNode.right, result );
      result.push( currentNode.value );
    }

    return result;
  }

  // TODO: Deleting a node from BST
}

export default BinarySearchTree;