import { Component, OnInit } from '@angular/core';
import 'jquery';
import { AuthoringService } from './services/authoring/authoring.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    environment: string;
    title: string;

    versions: any;
    versionsSubscription: Subscription;
    extensions: any;
    extensionsSubscription: Subscription;
    activeExtension: any;
    activeExtensionSubscription: Subscription;
    view: string;
    viewSubscription: Subscription;

    constructor(private authoringService: AuthoringService) {
        this.versionsSubscription = this.authoringService.getVersions().subscribe(data => this.versions = data);
        this.extensionsSubscription = this.authoringService.getExtensions().subscribe(data => this.extensions = data);
        this.activeExtensionSubscription = this.authoringService.getActiveExtension().subscribe(data => this.activeExtension = data);
        this.viewSubscription = this.authoringService.getView().subscribe(data => this.view = data);
    }

    ngOnInit() {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];

        this.assignFavicon();
    }

    assignFavicon() {
        const favicon = $('#favicon');

        switch (this.environment) {
            case 'local':
                favicon.attr('href', 'favicon_grey.ico');
                break;
            case 'dev':
                favicon.attr('href', 'favicon_red.ico');
                break;
            case 'uat':
                favicon.attr('href', 'favicon_green.ico');
                break;
            case 'training':
                favicon.attr('href', 'favicon_yellow.ico');
                break;
            default:
                favicon.attr('href', 'favicon.ico');
                break;
        }
    }
}
