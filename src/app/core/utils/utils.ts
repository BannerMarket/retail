export class Utils {

  public static concatReducer<T>(acc: Array<T>, curr: Array<T>): Array<T> {
    return acc.concat(curr);
  }

  static mean(a: number, b: number): number {
    return (a + b) / 2;
  }

  static range(start: number, end: number): Array<number> {
    const res = [];

    for (let i = start; i <= end; i++) {
      res.push(i);
    }

    return res;
  }
}
