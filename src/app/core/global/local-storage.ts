export class LocalStorage {

  public static getItem(key: string): string {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.localStorage.getItem(key);
  }

  public static setItem(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      return window.localStorage.setItem(key, value);
    }
  }

}
