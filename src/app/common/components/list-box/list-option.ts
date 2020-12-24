export class ListOption {
  public name: string;
  constructor(
    public label: string,
    public data: any
  ) {
    this.name = label;
  }
}
