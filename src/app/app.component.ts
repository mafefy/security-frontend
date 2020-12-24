import { InstallService } from './common/service/install.service';
import { Subscription } from 'rxjs';
import { CommonService } from './common/service/common/common.service';
import { TranslateService, LANGUAGES } from './common/service/translate/translate.service';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ConnectorService } from './common/service/connector/connector.service';
import { PrimeNGConfig } from 'primeng/api';

declare var FontFace;
declare var document;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    public appTranslated = false;
    constructor(
        private translateService: TranslateService,
        private cs: CommonService,
        private connectorService: ConnectorService,
        private pwaService: InstallService,
        private primeConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.cs.loadAppTheme();
        this.loadFont();
        this.loadTranslation();
        this.primeConfig.ripple = true;
        this.cs.navigation.userLogin();
        this.connectorService.loadHost();
        this.subscribeForLanguageChange();
    }

    ngOnDestroy() {
        this.lngSubscription.unsubscribe();
    }



    private lngSubscription: Subscription;
    private subscribeForLanguageChange() {
        this.lngSubscription = this.cs.events.register(TranslateService.CHANGE_LANGUAGE_EVENT).subscribe(() => {
            this.loadTranslation();
        });
    }

    /*
    public arabic() {
        this.translateService.setCurrentLanguage(LANGUAGES.ARABIC);
        this.loadTranslation();
    }

    public english() {
        this.translateService.setCurrentLanguage(LANGUAGES.ENGLISH);
        this.loadTranslation();
    }
    */
    public loadTranslation() {
      console.log(" change language");
        this.appTranslated = false;
        this.translateService.loadTranslationResources(done => {
            this.appTranslated = done;
        });
    }
    private loadFont() {
        let f = new FontFace("EBGaramond", "url(assets/fonts/EB_Garamond/EBGaramond-VariableFont_wght.ttf)", {});
        f.load().then((loadedFace) => {
            document.fonts.add(loadedFace);
        });
    }

    @HostListener('window:language')
    onLanguageChange() {
        console.log(" language changed");
        this.loadTranslation();
    }


}
