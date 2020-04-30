export class Utils {

  public static concatReducer<T>(acc: Array<T>, curr: Array<T>): Array<T> {
    return acc.concat(curr);
  }

}
