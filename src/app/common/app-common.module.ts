import { InstallService } from './service/install.service';
import { ShareService } from './service/share/share.service';
import { CenteredComponent } from './components/centered/centered.component';
import { Observable, pipe } from 'rxjs';
import { TranslateService } from './service/translate/translate.service';
import { NgModule, ReflectiveInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorService } from './service/connector/connector.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { CommonService } from './service/common/common.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { TranslatePipe } from './service/translate/translate.pipe';
import { RouterModule } from '@angular/router';
import { DynamicDialogModule, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {ButtonModule} from 'primeng/button';
import { DialogComponent } from './service/dialogs/dialog/dialog.component';
import { NavigationHeaderComponent } from './components/navigation-header/navigation-header.component';
import { PageContentComponent } from './components/page-content/page-content.component';
import { ProgressService } from './service/progress/progress.service';
import { FullScreenContentComponent } from './components/full-screen-content/full-screen-content.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { EventsService } from './service/events/events.service';
import { BlockedDirective } from './directives/blocked.directive';
import { KeysPipe } from './pipes/keys.pipe';
import { PageComponent } from './components/page/page.component';
import { ContourService } from './service/contour.service';
import { ListBoxComponent } from './components/list-box/list-box.component';
import {CheckboxModule} from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    TranslatePipe,
    CenteredComponent,
    DialogComponent,
    NavigationHeaderComponent,
    PageContentComponent,
    FullScreenContentComponent,
    ToggleButtonComponent,
    BlockedDirective,
    KeysPipe,
    PageComponent,
    ListBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MessageModule,
    MessagesModule,
    DynamicDialogModule,
    ButtonModule,
    SelectButtonModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule

  ],
  exports: [
    TranslatePipe,
    CenteredComponent,
    NavigationHeaderComponent,
    PageContentComponent,
    FullScreenContentComponent,
    ToggleButtonComponent,
    BlockedDirective,
    KeysPipe,
    PageComponent,
    ListBoxComponent
  ],
  providers: [
    ConnectorService,
    CommonService,
    MessageService,
    TranslateService,
    DialogService,
    ShareService,
    ProgressService,
    EventsService,
    InstallService,
    ContourService
  ]
})
export class AppCommonModule {
}
