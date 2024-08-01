import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {S3Service} from '../../services/s3/s3.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-breadcrumb-bar',
    templateUrl: './breadcrumb-bar.component.html',
    styleUrls: ['./breadcrumb-bar.component.scss']
})
export class BreadcrumbBarComponent implements OnInit {

    activeExtension: any;
    activeExtensionSubscription: Subscription;
    view: string;
    viewSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                private location: Location,
                private router: Router,
                private titleService: Title,
                private s3service: S3Service,
                private toastr: ToastrService) {
        this.activeExtensionSubscription = this.authoringService.getActiveExtension().subscribe(data => this.activeExtension = data);
        this.viewSubscription = this.authoringService.getView().subscribe(data => this.view = data);
    }

    ngOnInit() {
        const path = this.location.path().slice(1).split('/');
        const branch = path[0];
        const view = path[1];

        this.authoringService.httpGetExtensions().subscribe(extensions => {
            this.authoringService.setExtensions(extensions);
            if (branch) {
                this.authoringService.setActiveExtension(extensions.find(extension => extension.shortName === branch));
                this.getVersions(branch);

                if (view) {
                    this.authoringService.setView(view);
                }
            } else {
                this.authoringService.setActiveExtension(extensions[0]);
                this.router.navigate(['SNOMEDCT']);
                this.getVersions('SNOMEDCT');
            }
        });
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
                        if ((countryCodeUpperCase !== 'US') && (countryCodeUpperCase !== 'NL')) {
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

    setView(view): void {
        this.authoringService.setView(view);
    }
}
