import { Size } from './size';
import { Touch } from './touch';

export class RectPointSize {
  constructor(
    public point: Touch = new Touch(0,0),
    public size: Size = new Size(0,0)
  ) {

  }
}
