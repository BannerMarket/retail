export class WithAutoId {

  private static latestId = 1;
  public id: number;

  constructor() {
    this.id = WithAutoId.getId();
  }

  private static getId(): number {
    return WithAutoId.latestId++;
  }
}
