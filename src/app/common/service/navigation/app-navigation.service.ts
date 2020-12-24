import { ShareService } from './../share/share.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ShareKey } from '../share/share-key';

@Injectable({
  providedIn: 'root'
})
export class AppNavigationService {

  constructor(
    private router: Router,
    private shareService: ShareService
  ) { }

  public userLogin() {
    this.navigate('/user/login');
  }
  public userRegister() {
    this.navigate('/user/register');
  }

  public adminDashBoard() {
    this.navigate('/dashboard/admin');
  }

  public rootDashBoard() {
    this.navigate('/dashboard/root');
  }

  public userHome() {
    this.navigate('/chat/home');
  }

  public openSignature() {
    this.navigate('/home/signature');
  }

  // public home() {
  //   this.navigate('/home');
  // }

  private static seed: number;
  private rand(): number {
    if (!AppNavigationService.seed) {
      AppNavigationService.seed = new Date().getTime();
      console.log(" seed first");
    }
    console.log( " initialized");
    return ++AppNavigationService.seed;
  }

  private force(url: string) {
    return url + '/' + new Date().getTime();
  }

  public openInboxes(loginResponse: any) {
    this.shareService.put(ShareKey.LOGIN_RESPONSE, loginResponse);
    this.navigateWithData(this.force('/home/inboxes'));
  }
  public openSystems() {
    this.navigateWithData('/home/systems');
  }
  public openChangePassword() {
    this.navigateWithData('/home/change-password');
  }

  public openRegister() {
    this.navigateWithData('/home/register');
  }

  public openCorrespondences(inboxItem: any, useCache = false) {
    this.shareService.put(ShareKey.INBOX_ITEM, inboxItem);
    this.shareService.put(ShareKey.USE_CACHE, useCache);

    this.navigateWithData('/home/correspondences');
  }

  public openCorrespondenceDetails(meta: any[]) {
    this.shareService.put(ShareKey.CORRESPONDENCE_META_INFO, meta);
    this.navigateWithData('/home/correspondences/details');
  }

  public navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  public navigateWithData(url) {
    this.router.navigate([url]);
  }

}
