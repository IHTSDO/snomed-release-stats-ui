import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export class TableRow {
    name: string;
    total: number;
    descriptions: number;
    relationships: number;

    constructor(name, total, descriptions, relationships) {
        this.name = name;
        this.total = total;
        this.descriptions = descriptions;
        this.relationships = relationships;
    }
}

@Component({
    selector: 'app-general-release-statistics',
    templateUrl: './general-release-statistics.component.html',
    styleUrls: ['./general-release-statistics.component.scss']
})
export class GeneralReleaseStatisticsComponent implements OnInit {

    overviewRow: TableRow;
    tableRows: TableRow[] = [];

    filePath: any;
    filePathSubscription: Subscription;

    constructor(private s3Service: S3Service, private toastr: ToastrService) {
        this.filePathSubscription = this.s3Service.getFilePath().subscribe(filePath => {
            this.filePath = filePath;
            this.getStats();
        });
    }

    ngOnInit(): void {
        this.getStats();
    }

    getStats() {
        this.tableRows = [];
        this.overviewRow = null;

        this.s3Service.getConceptStatistics().subscribe(concepts => {
            this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0, 0);

            concepts.forEach(item => {
                this.overviewRow.total += item.totalActive;
                this.tableRows.push({name: item.name, total: item.totalActive, descriptions: null, relationships: null});
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });

            this.s3Service.getDescriptionStatistics().subscribe(descriptions => {
                descriptions.forEach((item, index) => {
                    this.overviewRow.descriptions += item.total;
                    this.tableRows[index].descriptions = item.total;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });

            this.s3Service.getRelationshipStatistics().subscribe(relationships => {
                relationships.forEach((item, index) => {
                    this.overviewRow.relationships += item.total;
                    this.tableRows[index].relationships = item.total;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });
        }, error => {
            this.toastr.error('Data not found in S3', 'ERROR');
        });
    }

    percentage(a) {
        return (a / this.overviewRow.total) * 100;
    }
}
