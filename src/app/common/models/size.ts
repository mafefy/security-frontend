export class Size {
  constructor(
    public width: number = 0,
    public height: number =0
  ) {

  }

  public hasArea(): boolean {
    return this.width > 0 && this.height > 0 ;
  }
}
