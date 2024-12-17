import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {Title} from '@angular/platform-browser';
import {S3Service} from '../../services/s3/s3.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent {

    environment: string;
    path: string;

    versions: any;
    versionsSubscription: Subscription;
    extensions: any;
    extensionsSubscription: Subscription;
    activeExtension: any;
    activeExtensionSubscription: Subscription;
    view: string;
    viewSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                public titleService: Title,
                private s3service: S3Service,
                private toastr: ToastrService) {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.versionsSubscription = this.authoringService.getVersions().subscribe(data => this.versions = data);
        this.extensionsSubscription = this.authoringService.getExtensions().subscribe(data => this.extensions = data);
        this.activeExtensionSubscription = this.authoringService.getActiveExtension().subscribe(data => this.activeExtension = data);
        this.viewSubscription = this.authoringService.getView().subscribe(data => this.view = data);
    }

    getVersions(extension: string) {
        this.authoringService.httpGetVersions(extension).subscribe(versions => {
            this.authoringService.setVersions(versions);

            if (extension === 'SNOMEDCT') {
                const localVersions = versions['items'].sort((a, b) => (a.version < b.version) ? 1 : -1);
                const latest = localVersions.shift();
                const previous = localVersions.shift();
                this.titleService.setTitle('SNOMEDCT Release Statistics ' + latest.version);

                const path = '/runs/' +
                    'SnomedCT_InternationalRF2_PRODUCTION_' + latest.effectiveDate
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

                    if (metadata.defaultNamespace) {
                        const countryCodeUpperCase = this.activeExtension.countryCode.toUpperCase();

                        let folder = '';
                        if ((countryCodeUpperCase !== 'US') && (countryCodeUpperCase !== 'NL') && (countryCodeUpperCase !== 'AU')) {
                            folder = 'Extensions';
                        }

                        const basePackageName = 'SnomedCT_ManagedService' + countryCodeUpperCase +
                            '_PRODUCTION_' + countryCodeUpperCase + metadata.defaultNamespace + '_';

                        const emptyPackageName = 'empty-rf2-snapshot';

                        if (localVersions) {
                            if (localVersions.length) {
                                const previous = localVersions.shift();
                                const path = folder + '/runs/' +
                                    basePackageName + latest.effectiveDate + '---' + basePackageName + previous.effectiveDate;
                                this.s3service.setFilePath(path);
                            } else {
                                const path = folder + '/runs/' +
                                    basePackageName + latest.effectiveDate + '---' + emptyPackageName;
                                this.s3service.setFilePath(path);
                            }
                            const rsPath = folder +
                                '/ReleaseSummaries' +
                                '/ManagedService' + countryCodeUpperCase +
                                '/ManagedService' + countryCodeUpperCase + '_ReleaseSummaries.json';
                            this.s3service.setRSFilePath(rsPath);
                        }
                    } else {
                        this.toastr.error('metadata.defaultNamespace not populated', 'ERROR');
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
