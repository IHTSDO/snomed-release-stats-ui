import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {Title} from '@angular/platform-browser';
import {S3Service} from '../../services/s3/s3.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;
    path: string;

    versions: any;
    versionsSubscription: Subscription;
    extensions: any;
    extensionsSubscription: Subscription;
    activeExtension: any;
    activeExtensionSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                public titleService: Title,
                private s3service: S3Service) {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.versionsSubscription = this.authoringService.getVersions().subscribe(data => this.versions = data);
        this.extensionsSubscription = this.authoringService.getExtensions().subscribe(data => this.extensions = data);
        this.activeExtensionSubscription = this.authoringService.getActiveExtension().subscribe(data => this.activeExtension = data);
    }

    ngOnInit() {
        this.authoringService.httpGetExtensions().subscribe(extensions => {
            this.authoringService.setExtensions(extensions);
            this.authoringService.setActiveExtension(extensions[0]);

            this.authoringService.httpGetVersions('SNOMEDCT').subscribe(versions => {
                this.authoringService.setVersions(versions);
            });
        });

        this.getVersions('SNOMEDCT');
    }

    getVersions(extension: string) {
        this.authoringService.httpGetVersions(extension).subscribe(versions => {
            this.authoringService.setVersions(versions);

            if (extension === 'SNOMEDCT') {
                const localVersions = versions['items'].sort((a, b) => (a.version < b.version) ? 1 : -1);
                const latest = localVersions.shift();

                const previous = localVersions.shift();
                this.titleService.setTitle('SNOMEDCT Release Statistics ' + latest.version);

                const path = '/runs/SnomedCT_InternationalRF2_PRODUCTION_' + latest.effectiveDate
                    + '---' +
                    'SnomedCT_InternationalRF2_PRODUCTION_' + previous.effectiveDate;
                this.s3service.setFilePath(path);

                const rsPath = '/ReleaseSummaries/InternationalRF2/InternationalRF2_ReleaseSummaries.json';
                this.s3service.setRSFilePath(rsPath);
            } else {
                this.authoringService.httpGetBranchMetadata(extension).subscribe(metadata => {
                    const localVersions = versions['items'].sort((a, b) => (a.version < b.version) ? 1 : -1);
                    const latest = localVersions.shift();
                    this.titleService.setTitle('SNOMEDCT Release Statistics ' + latest.version);

                    if (localVersions) {
                        if (localVersions.length) {
                            const previous = localVersions.shift();
                            const path = 'Extensions/runs/SnomedCT_ManagedService' + this.activeExtension.countryCode.toUpperCase() + '_PRODUCTION_' + this.activeExtension.countryCode.toUpperCase() + metadata.defaultNamespace + '_' + latest.effectiveDate
                                + '---' +
                                'SnomedCT_ManagedService' + this.activeExtension.countryCode.toUpperCase() + '_PRODUCTION_' + this.activeExtension.countryCode.toUpperCase() + metadata.defaultNamespace + '_' + previous.effectiveDate;
                            this.s3service.setFilePath(path);
                        } else {
                            const path = 'Extensions/runs/SnomedCT_ManagedService' + this.activeExtension.countryCode.toUpperCase() + '_PRODUCTION_' + this.activeExtension.countryCode.toUpperCase() + metadata.defaultNamespace + '_' + latest.effectiveDate
                                + '---empty-rf2-snapshot';
                            this.s3service.setFilePath(path);
                        }

                        const rsPath = 'Extensions/ReleaseSummaries/ManagedService' + this.activeExtension.countryCode.toUpperCase() + '/ManagedService' + this.activeExtension.countryCode.toUpperCase() + '_ReleaseSummaries.json';
                        this.s3service.setRSFilePath(rsPath);
                    }
                });
            }
        });
    }

    setExtension(extension) {
        this.authoringService.setActiveExtension(extension);
        this.getVersions(extension.shortName);
    }
}
