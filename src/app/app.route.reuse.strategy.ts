import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class AppResuseStrategy implements RouteReuseStrategy {

  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(_route: ActivatedRouteSnapshot, _detachedTree: DetachedRouteHandle): void {
    console.log("store" + this.getPath(_route));
    return;
  }

  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    console.log("retrieve:" + this.getPath(_route));
    return null;
  }

  reuseRoutes = [
    '/home/correspondences/list' 
   ];

   private isReusePath(path: string) {
    for ( let reusePath of this.reuseRoutes) {
      if ( reusePath == path) {
        return true;
      }
    }
    return false;
  }

  shouldReuseRoute( future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot ): boolean {
    
    if ( this.getPath(curr) == this.getPath(future)) {
      console.log( "reused same url:" + this.getPath(future));
      return true;
    } 
    
    if ( this.isReusePath(this.getPath(future)) ) {
      console.log( "reused path:" + this.getPath(future));
      return true;
    }
      console.log("not reused: future"  + this.getPath(future) +  " current:" + this.getPath(curr) );
      return false;
    
  }

  private getPath(snapShot : ActivatedRouteSnapshot): string {
    return snapShot['_routerState'].url;
  }
}