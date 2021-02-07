import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CommonService } from 'src/app/common/service/common/common.service';
import { DialogInfo } from 'src/app/common/service/dialogs/dialog-info';
import { User } from '../service/models/user';
import { UsersListRequest } from '../service/models/users-list.request';
import { UsersListResponse } from '../service/models/users-list.response';
import { SystemsService } from '../service/systems.service';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css']
})
export class SystemsComponent implements OnInit {

  public pageSize = 2;
  public users: User[];
  public loading = false;
  public totalRecords: number;
  public systemId: string;

  constructor(
    public cs: CommonService,
    public systemsService: SystemsService
  ) { }

  ngOnInit(): void {
  }

  loadUsersList(event: LazyLoadEvent) {
    this.lastIndex = event.first;
    this.loading = true;
    let request = new UsersListRequest( (event.first / event.rows), event.rows);
    request.name = this.systemId;
    this.systemsService.systemsList(request, (response: UsersListResponse) => {
      this.users = response.users;
      this.totalRecords = response.totalRecords;
      this.loading = false;
    });

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network

  }


  public addSystem() {
    this.cs.navigation.openRegister();
  }

  private lastIndex = 0;
  private refreshUsersList() {
    this.loadUsersList( {first:this.lastIndex , rows: this.pageSize})
  }

  public suspendSystem(user: User) {
    this.systemsService.suspendAccount( user, !user.suspended , () => {
      this.cs.dialogsService.confirm(new DialogInfo('done-successfully', 'action-successfully',
      () => {
        this.refreshUsersList();
      }));
    });
  }

  public deleteSystem(user: User) {
    this.systemsService.deleteSystem( user, () => {
      this.cs.dialogsService.confirm(new DialogInfo('done-successfully', 'action-successfully',
      () => {
        this.refreshUsersList();
      }));
    });
  }

  public changePassword(user: User) {
    this.cs.share.put( User.USER, user);
    this.cs.navigation.openChangePassword();
  }

  public onSearch() {
    this.refreshUsersList();
  }

  public onSearchChanged() {
    if ( ! this.systemId) {
      this.refreshUsersList();
    }
  }
}
