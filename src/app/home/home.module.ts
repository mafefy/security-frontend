import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../common/app-common.module';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { SystemsComponent } from './systems/systems.component';
import { TableModule } from 'primeng/table';
import { RegisterComponent } from './register/register.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'main', component: MainComponent },
      { path: 'systems', component: SystemsComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'change-password', component: ChangePasswordComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    SystemsComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    TableModule,
    InputSwitchModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    MenuModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    ListboxModule,
    CardModule,
    InputNumberModule,
    CalendarModule,
    AccordionModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
