import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModel, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { AppCommonModule } from '../common/app-common.module';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  declarations: [UserComponent, LoginComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    InputTextModule,
    CardModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [UserService]
})
export class UserModule { }
