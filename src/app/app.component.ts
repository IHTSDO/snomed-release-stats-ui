import { Component, OnInit } from '@angular/core';
import 'jquery';
import { Title } from '@angular/platform-browser';
import { BranchingService } from './services/branching/branching.service';
import { S3Service } from './services/s3/s3.service';
import { AuthoringService } from './services/authoring/authoring.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    versions: any;
    environment: string;

    constructor(private authoringService: AuthoringService,
                private branchingService: BranchingService,
                private s3Service: S3Service,
                private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('SNOMED CT Release Statistics');
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];

        this.authoringService.getVersions().subscribe(versions => {
            this.versions = versions;

            this.versions = this.versions['items'].sort((a, b) => (a.version < b.version) ? 1 : -1);
            const latest = this.versions.shift();
            const previous = this.versions.shift();

            const path = 'SnomedCT_InternationalRF2_PRODUCTION_'
                + latest.effectiveDate + 'T120000Z---SnomedCT_InternationalRF2_PRODUCTION_'
                + previous.effectiveDate + 'T120000Z';
            this.branchingService.setBranchPath(path);
        });

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
