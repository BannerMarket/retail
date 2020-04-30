export interface TreeNode<T> {
  data: T;
  children: Array<TreeNode<T>>;
}

export type Tree<T> = Array<TreeNode<T>>;
