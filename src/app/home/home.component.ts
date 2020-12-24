import { HomeEvents } from './home.events';
import { Subscription } from 'rxjs';
import { UserService } from './../user/service/user.service';
import { LANGUAGES_EVENTS } from './../common/service/translate/translate.service';
import { TranslateService, LANGUAGES } from 'src/app/common/service/translate/translate.service';
import { Router } from '@angular/router';
import { Inboxes } from './service/models/Inboxes';
import { LoginResponse } from 'src/app/user/service/models/login.response';
import { Component, OnInit, ViewChild, ContentChild, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Department } from './service/models/department';
import { InboxItem } from './service/models/inbox.item';
import { AppInfo } from './service/models/app.info';
import { DashboardService } from './service/dashboard.service';
import { SwitchDepartment } from './service/models/switch-department';
import { CommonService } from '../common/service/common/common.service';
import { ShareKey } from '../common/service/share/share-key';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public static HOME_EVENTS = "home-event";

  public loginResponse: LoginResponse;

  public inboxesDisplay = true;
  public menuDisplay = false;

  inboxes: InboxItem[];
  // departments dialog
  showDepartmentsDialog: boolean = false;
  showAppsDialog: boolean = false;
  // applications information
  applications: any[];
  selectedApplication: any;

  // departments information
  departments: any[];
  selectedDepartment: Department;
  filterValue: string;
  public darkMode: boolean = false;

  constructor(
    private dashBoardService: DashboardService,
    private cs: CommonService,
    private userService: UserService,
    private elementRef: ElementRef
  ) {

  }

  ngOnInit() {
    this.selectedLanguage = this.cs.translateService.getCurrentLanguage();

  }


  ngOnDestroy(): void {

  }


  private homeSubscription: Subscription;
  private registerForHomeEvents() {
    this.homeSubscription = this.cs.events.register(
      HomeComponent.HOME_EVENTS).subscribe((event: HomeEvents) => {
        this.showDepartmentsDialog = event.openDepartments;
        this.showAppsDialog = event.openApps;
        //  this.onRefreshClicked();
      });
  }

  private initialize() {
    if (this.loginResponse) {
      if (this.loginResponse.Inboxes) {
        this.inboxes = this.loginResponse.Inboxes.InboxItems;
      }
    }
  }



  public onMenuClicked() {
    this.menuDisplay = true;
  }


  public languages: any[] = [
    { code: "ar", label: this.cs.translateService.get('arabic') },
    { code: "en", label: this.cs.translateService.get('english') }
  ];

  public selectedLanguage: string;

  public switchLanguage(lng: any) {

    //this.cs.events.triggerEvent(InboxesRefershEvent.REFRESH, new InboxesRefershEvent(true));
    //update login response with new selected language
    //this.switch();
    //this.closePopupViews();
    this.updateLanguage(lng,true);

    //this.cs.navigation.userLogin();
  }

  private updateLanguage(lng: any, trigger: boolean) {

    switch (lng.code) {
      case "en":
        this.cs.translateService.setCurrentLanguage(LANGUAGES.ENGLISH, trigger);
        this.selectedLanguage = LANGUAGES.ENGLISH;
        break;
      case "ar":
        this.cs.translateService.setCurrentLanguage(LANGUAGES.ARABIC,trigger);
        this.selectedLanguage = LANGUAGES.ARABIC;
        break;
    }
  }

  public onSignOut() {
    this.userService.signOut();
    this.cs.navigation.userLogin();
  }

  public addSystem() {
    this.cs.navigation.openRegister();
  }

  private inboxesSupscription: Subscription;



  public selectedMode: string;
  public handleMode() {
    this.cs.setAppTheme(this.selectedMode);
  }




}
