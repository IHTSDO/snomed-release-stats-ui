import { Component, Input, OnInit } from '@angular/core';
import {PathingService} from '../../services/pathing/pathing.service';
import {Subscription} from 'rxjs';
import {AuthoringService} from '../../services/authoring/authoring.service';
import {Title} from '@angular/platform-browser';
import {BranchingService} from '../../services/branching/branching.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;
    @Input() title: string;

    branches: any;
    branchesSubscription: Subscription;
    activeBranch: any;
    activeBranchSubscription: Subscription;

    path: string;

    versions: any;

    constructor(private pathingService: PathingService,
                private authoringService: AuthoringService,
                private titleService: Title,
                private branchingService: BranchingService) {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.branchesSubscription = this.pathingService.getBranches().subscribe(data => this.branches = data);
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
    }

    ngOnInit() {
        this.pathingService.httpGetBranches().subscribe(branches => {
            this.pathingService.setBranches(branches);
            if (!this.path) {
                this.pathingService.setActiveBranch(branches[0]);
            }
        });
    }

    getVersions() {
        this.authoringService.getVersions().subscribe(versions => {
            this.versions = versions;

            this.versions = this.versions['items'].sort((a, b) => (a.version < b.version) ? 1 : -1);
            const latest = this.versions.shift();
            const previous = this.versions.shift();
            this.title = 'SNOMED CT Release Statistics International Edition ' + latest.version;
            this.titleService.setTitle(this.title);

            console.log('versions: ', this.versions);
            console.log('latest: ', latest);
            console.log('previous: ', previous);

            const path = 'SnomedCT_InternationalRF2_PRODUCTION_'
                + latest.effectiveDate + 'T120000Z---SnomedCT_InternationalRF2_PRODUCTION_'
                + previous.effectiveDate + 'T120000Z';
            this.branchingService.setBranchPath(path);
        });
    }

    setBranch(branch) {
        this.pathingService.setActiveBranch(branch);
    }
}
