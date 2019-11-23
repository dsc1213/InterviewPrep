import { isNullOrUndefined } from '../../../helpers/type-of';

export const isValidBST = root => {
  if ( !root ) return true;

  const callStack = [];
  let prevNode = null;
  let currNode = root;

  while ( !isNullOrUndefined( currNode ) || callStack.length > 0 ) {

    while ( !isNullOrUndefined( currNode ) ) {
      callStack.push( currNode );
      currNode = currNode.left;
    }

    currNode = callStack.pop();
    if ( !isNullOrUndefined( prevNode ) && prevNode.value >= currNode.value ) return false;
    prevNode = currNode;
    currNode = currNode.right;
  }

  return true;
}

export const isValidBSTRecursive = ( root, min, max ) => {
  if ( !root ) return true;

  if ( root.value <= min || root.value >= max ) return false;

  const isLeftBST = isValidBSTRecursive( root.left, min, root.value );
  const isRightBST = isValidBSTRecursive( root.right, root.value, max );

  if ( !isLeftBST || !isRightBST ) return false;

  return true;
}

export const minDepth = root => {
  if ( isNullOrUndefined( root ) ) return 0;
  else if ( isNullOrUndefined( root.left ) && isNullOrUndefined( root.right ) ) return 1;
  else if ( isNullOrUndefined( root.left ) ) return 1 + minDepth( root.right );
  else if ( isNullOrUndefined( root.right ) ) return 1 + minDepth( root.left );
  else return 1 + Math.min( minDepth( root.left ), minDepth( root.right ) );
}

export const maxDepth = root => {
  let nodes = [{ node: root, depth: 1 }];
  let currNode = nodes.pop();
  let max = 0;

  while ( !isNullOrUndefined( currNode ) && !isNullOrUndefined( currNode.node ) ) {
    let node = currNode.node;

    if ( !isNullOrUndefined( node.left ) ) {
      nodes.push( { node: node.left, depth: currNode.depth + 1 } );
    }

    if ( !isNullOrUndefined( node.right ) ) {
      nodes.push( { node: node.right, depth: currNode.depth + 1 } );
    }

    if ( currNode.depth > max ) {
      max = currNode.depth;
    }

    currNode = nodes.pop();
  }

  return max;
}