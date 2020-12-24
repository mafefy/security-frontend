import { Injectable } from '@angular/core';
import { RectPointSize } from '../models/rect-point-size';
import { Touch } from '../models/touch';

@Injectable({
  providedIn: 'root'
})
export class ContourService {

  constructor(

  ) { }




  /**
   * do horizontal line scanning over canvas pixel data
   * and find main contour
   */
  public mainContour(pixels: any[], canvasWidth: number, canvasHeight: number): RectPointSize {
    let rect = new RectPointSize();
    let minPoint: Touch = new Touch(canvasWidth, canvasHeight);
    let maxPoint: Touch = new Touch(0, 0);
    for (let y = 0; y < canvasHeight; y++) {
      let isLineTouched = true;
      // x forward ------>
      for (let x = 0; x < canvasWidth; x++) {
        if (this.isPixelTouched(pixels, this.getPixelIndexInBitmap(x, y, canvasWidth))) {
          minPoint.x = x < minPoint.x ? x : minPoint.x;
          minPoint.y = y < minPoint.y ? y : minPoint.y;
          isLineTouched = true;
          break;
        }
      }

      // x backward <-----------
      if (isLineTouched) {
        for (let x = canvasWidth; x > 0; x--) {
          if (this.isPixelTouched(pixels, this.getPixelIndexInBitmap(x, y, canvasWidth))) {
            maxPoint.x = x > maxPoint.x ? x : maxPoint.x;
            maxPoint.y = y > maxPoint.y ? y : maxPoint.y;
            break;
          }
        }
      }


    }
    rect.point = minPoint;
    rect.size.width = maxPoint.x - minPoint.x;
    rect.size.height = maxPoint.y - minPoint.y;
    return rect;
  }


  private getPixelIndexInBitmap(x: number, y: number, width): number {
    return (y * (4 * width)) + (x * 4);
  }
  /**
   * if pixel channels is touched we ignore the alpha
   * */
  private isPixelTouched(pixels: any[], index: number): boolean {
    for (let i = index; i < (index + 3); i++) {
      // if is touched
      if (pixels[i] > 0) {
        return true;
      }
    }
    return false;
  }

}

