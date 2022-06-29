import {Component, OnInit} from '@angular/core';
import {S3Service} from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {PathingService} from '../../services/pathing/pathing.service';

export class TableRow {
    constructor(
        public effectiveTime: string,
        public conceptsNew: number,
        public conceptsModified: number,
        public conceptsTotal: number,
        public descriptionsNew: number,
        public descriptionsModified: number,
        public descriptionsTotal: number,
        public textDefinitionNew: number,
        public textDefinitionModified: number,
        public textDefinitionTotal: number,
        public languageRefsetNew: number,
        public languageRefsetModified: number,
        public languageRefsetTotal: number,
        public axiomNew: number,
        public axiomModified: number,
        public axiomTotal: number,
        public statedNew: number,
        public statedModified: number,
        public statedTotal: number,
        public inferredNew: number,
        public inferredModified: number,
        public inferredTotal: number,
        public concreteRelationshipNew: number,
        public concreteRelationshipModified: number,
        public concreteRelationshipTotal: number
    ) {}
}

@Component({
    selector: 'app-release-summary',
    templateUrl: './release-summary.component.html',
    styleUrls: ['./release-summary.component.scss']
})
export class ReleaseSummaryComponent implements OnInit {


    rawTableRows: TableRow[] = [];
    titleRow: string[];
    tableRows: TableRow[] = [];
    aggregator = false;

    tableColours = [
        'bg-tonys-pink',
        'bg-perano',
        'bg-spring-rain',
        'bg-vanilla',
        'bg-tonys-pink',
        'bg-perano',
        'bg-spring-rain',
        'bg-vanilla'
    ];

    activeBranch: any;
    activeBranchSubscription: Subscription;

    constructor(private s3Service: S3Service, private pathingService: PathingService) {
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => {
            if (this.activeBranch && this.activeBranch.shortName !== data['shortName']) {
                this.getStats();
            }
            this.activeBranch = data;
        });
    }

    ngOnInit(): void {
        this.getStats();
    }

    getStats() {
        this.tableRows = [];

        this.s3Service.getReleaseSummary().subscribe(data => {
            this.titleRow = data['columnHeadings'];

            data['releases'].forEach(item => {
                this.rawTableRows.push(
                    {
                        effectiveTime: item.effectiveTime,
                        conceptsNew: item['data'][0],
                        conceptsModified: item['data'][1],
                        conceptsTotal: item['data'][2],
                        descriptionsNew: item['data'][3],
                        descriptionsModified: item['data'][4],
                        descriptionsTotal:  item['data'][5],
                        textDefinitionNew: item['data'][6],
                        textDefinitionModified: item['data'][7],
                        textDefinitionTotal:  item['data'][8],
                        languageRefsetNew: item['data'][9],
                        languageRefsetModified: item['data'][10],
                        languageRefsetTotal:  item['data'][11],
                        axiomNew: item['data'][12],
                        axiomModified: item['data'][13],
                        axiomTotal:  item['data'][14],
                        statedNew: item['data'][15],
                        statedModified: item['data'][16],
                        statedTotal:  item['data'][17],
                        inferredNew: item['data'][18],
                        inferredModified: item['data'][19],
                        inferredTotal:  item['data'][20],
                        concreteRelationshipNew:  item['data'][21],
                        concreteRelationshipModified:  item['data'][22],
                        concreteRelationshipTotal:  item['data'][23]
                    });
            });

            this.tableRows = this.cloneObject(this.rawTableRows);
        });
    }

    calculateColour(index: number): string {
        if (index === 0) {
            return '';
        } else {
            return this.tableColours[Math.ceil(index / 3) - 1];
        }
    }

    resetTable(): void {
        this.aggregator = false;
        this.tableRows = this.cloneObject(this.rawTableRows);
    }

    cloneObject(object): any {
        return JSON.parse(JSON.stringify(object));
    }
}
