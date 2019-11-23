import { isValidBST, isValidBSTRecursive, minDepth, maxDepth } from '../bst_algorithms';

class TreeNode {
  constructor( value ) {
    this.value = value || null;
    this.left = null;
    this.right = null;
  }
}

describe( 'isValidBST', () => {
  it( 'isValidBST, iterative, root = null', () => {
    const root = null;

    expect( isValidBST( root ) ).toBeTruthy();
  } );
  
  it( 'isValidBST, iterative, valid = false', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 7 );
    root.right.right = new TreeNode( 6 );

    expect( isValidBST( root ) ).toBeFalsy();
  } );

  it( 'isValidBST, iterative, valid = true', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 4 );
    root.right.right = new TreeNode( 6 );

    expect( isValidBST( root ) ).toBeTruthy();
  } );
} );

describe( 'isValidBSTRecursive', () => {
  it( 'isValidBSTRecursive, iterative, root = null', () => {
    const root = null;

    expect( isValidBSTRecursive( root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ) ).toBeTruthy();
  } );
  
  it( 'isValidBSTRecursive, iterative, valid = false', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 7 );
    root.right.right = new TreeNode( 6 );

    expect( isValidBSTRecursive( root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ) ).toBeFalsy();
  } );

  it( 'isValidBSTRecursive, iterative, valid = true', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 4 );
    root.right.right = new TreeNode( 6 );

    expect( isValidBSTRecursive( root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER ) ).toBeTruthy();
  } );
} );

describe( 'minDepth', () => {
  it( 'minDepth, root = null', () => {
    const root = null;

    expect( minDepth( root ) ).toStrictEqual( 0 );
  } );

  it( 'minDepth, case 1: left and right nodes to root present', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 7 );
    root.right.right = new TreeNode( 6 );

    expect( minDepth( root ) ).toStrictEqual( 2 );
  } );

  it( 'minDepth, case 2: no left nodes to root present', () => {
    const root = new TreeNode( 3 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 7 );
    root.right.right = new TreeNode( 6 );

    expect( minDepth( root ) ).toStrictEqual( 3 );
  } );

  it( 'minDepth, case 2: no right nodes to root present', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );

    expect( minDepth( root ) ).toStrictEqual( 2 );
  } );

  it( 'minDepth, case 2: only root present', () => {
    const root = new TreeNode( 3 );

    expect( minDepth( root ) ).toStrictEqual( 1 );
  } );
} );

describe( 'maxDepth', () => {
  it( 'maxDepth, root = null', () => {
    const root = null;

    expect( maxDepth( root ) ).toStrictEqual( 0 );
  } );

  it( 'maxDepth, case 1: left and right nodes to root present', () => {
    const root = new TreeNode( 3 );
    root.left = new TreeNode( 1 );
    root.right = new TreeNode( 5 );
    root.right.left = new TreeNode( 7 );
    root.right.right = new TreeNode( 6 );

    expect( maxDepth( root ) ).toStrictEqual( 3 );
  } );
} );