import BinarySearchTree from '../binary-search-tree';

describe( 'Binary Search Tree', () => {
  it( 'Init a BST', () => {
    const bst = new BinarySearchTree();

    expect( bst ).toBeInstanceOf( BinarySearchTree );
    expect( bst.root ).toBeNull();
  } );

  it( 'BST Insert', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );
    bst.Insert( 1 );

    expect( bst.root.value ).toStrictEqual( 3 );
    expect( bst.root.left.value ).toStrictEqual( 2 );
    expect( bst.root.left.left.value ).toStrictEqual( 1 );
    expect( bst.root.left.right ).toBeNull();
    expect( bst.root.right.value ).toStrictEqual( 5 );
    expect( bst.root.right.left.value ).toStrictEqual( 4 );
    expect( bst.root.right.left.left ).toBeNull();
    expect( bst.root.right.left.right ).toBeNull();
    expect( bst.root.right.right.value ).toStrictEqual( 6 );
    expect( bst.root.right.right.left ).toBeNull();
    expect( bst.root.right.right.right ).toBeNull();
  } );

  it( 'BST Search', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    expect( bst.Search( bst.root, 2 ) ).toBeTruthy();
    expect( bst.Search( bst.root, 4 ) ).toBeTruthy();
    expect( bst.Search( bst.root, 1 ) ).toBeFalsy();
  } );

  it( 'BST FindParent', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    expect( bst.FindParent( bst.root, 2 ).value ).toStrictEqual( 3 );
    expect( bst.FindParent( bst.root, 1 ) ).toBeNull();
    expect( bst.FindParent( bst.root, 6 ).value ).toStrictEqual( 5 );
    expect( bst.FindParent( bst.root, 4 ) ).toBeNull();

    const singNodeBST = new BinarySearchTree();
    singNodeBST.Insert( 3 );

    expect( singNodeBST.FindParent( singNodeBST.root, 3 ) ).toBeNull();

    const bst_1 = new BinarySearchTree();
    bst_1.Insert( 3 );
    bst_1.Insert( 2 );

    expect( bst_1.FindParent( bst_1.root, 5 ) ).toBeNull();
  } );

  it( 'BST FindNode', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    expect( bst.FindNode( bst.root, 2 ).value ).toStrictEqual( 2 );
    expect( bst.FindNode( bst.root, 5 ).value ).toStrictEqual( 5 );
    expect( bst.FindNode( bst.root, 1 ) ).toBeNull();
  } );

  it( 'BST FindMinimum', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    expect( bst.FindMinimum( bst.root ) ).toStrictEqual( 2 );

    const emptyBST = new BinarySearchTree();

    expect( emptyBST.FindMinimum() ).toBeNull();
  } );

  it( 'BST FindMaximum', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    expect( bst.FindMaximum( bst.root ) ).toStrictEqual( 6 );

    const emptyBST = new BinarySearchTree();

    expect( emptyBST.FindMaximum() ).toBeNull();
  } );

  it( 'BST InOrderTrav', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    const result = bst.InOrderTrav( bst.root, [] );

    expect( result.length ).toStrictEqual( 5 );
    expect( result[0] ).toStrictEqual( 2 );
    expect( result[1] ).toStrictEqual( 3 );
    expect( result[2] ).toStrictEqual( 4 );
    expect( result[3] ).toStrictEqual( 5 );
    expect( result[4] ).toStrictEqual( 6 );
  } );

  it( 'BST PreOrderTrav', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    const result = bst.PreOrderTrav( bst.root, [] );

    expect( result.length ).toStrictEqual( 5 );
    expect( result[0] ).toStrictEqual( 3 );
    expect( result[1] ).toStrictEqual( 2 );
    expect( result[2] ).toStrictEqual( 5 );
    expect( result[3] ).toStrictEqual( 4 );
    expect( result[4] ).toStrictEqual( 6 );
  } );

  it( 'BST PostOrderTrav', () => {
    const bst = new BinarySearchTree();

    bst.Insert( 3 );
    bst.Insert( 5 );
    bst.Insert( 4 );
    bst.Insert( 6 );
    bst.Insert( 2 );

    const result = bst.PostOrderTrav( bst.root, [] );

    expect( result.length ).toStrictEqual( 5 );
    expect( result[0] ).toStrictEqual( 2 );
    expect( result[1] ).toStrictEqual( 4 );
    expect( result[2] ).toStrictEqual( 6 );
    expect( result[3] ).toStrictEqual( 5 );
    expect( result[4] ).toStrictEqual( 3 );
  } );
} );

