import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export class TableRow {
    name: string;
    newConcepts: number;
    totalActive: number;
    sd: number;
    p: number;

    constructor(name, newConcepts, totalActive, sd, p) {
        this.name = name;
        this.newConcepts = newConcepts;
        this.totalActive = totalActive;
        this.sd = sd;
        this.p = p;
    }
}

@Component({
    selector: 'app-new-concepts',
    templateUrl: './new-concepts.component.html',
    styleUrls: ['./new-concepts.component.scss']
})
export class NewConceptsComponent implements OnInit {

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
            this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0, 0, 0);

            concepts.forEach(item => {
                this.overviewRow.totalActive += item.totalActive;
                this.overviewRow.newConcepts += item.newlyCreated;
                this.overviewRow.sd += item.sd;
                this.overviewRow.p += item.p;

                this.tableRows.push({
                    name: item.name,
                    newConcepts: item.newlyCreated,
                    totalActive: item.totalActive,
                    sd: item.sd,
                    p: item.p
                });
            });
        }, error => {
            this.toastr.error('Data not found in S3', 'ERROR');
        });
    }

    percentage(a, b) {
        return (a / b) * 100;
    }
}
