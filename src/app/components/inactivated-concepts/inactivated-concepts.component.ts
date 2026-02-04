import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { CommonModule, DecimalPipe } from '@angular/common';

export class TableRow {
    name: string;
    totalActive: number;
    newInactivations: number;

    constructor(name, totalActive, newInactivations) {
        this.name = name;
        this.totalActive = totalActive;
        this.newInactivations = newInactivations;
    }
}

@Component({
    selector: 'app-inactivated-concepts',
    templateUrl: './inactivated-concepts.component.html',
    styleUrls: ['./inactivated-concepts.component.scss'],
    imports: [CommonModule, DecimalPipe]
})
export class InactivatedConceptsComponent implements OnInit {

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

        this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0);

        this.s3Service.getConceptStatistics().subscribe(concepts => {
            concepts.forEach(concept => {
                this.overviewRow.totalActive += concept.totalActive;

                this.tableRows.push({
                    name: concept.name,
                    totalActive: concept.totalActive,
                    newInactivations: 0
                });
            });

            this.s3Service.getInactivationStatistics().subscribe(inactivations => {
                inactivations.forEach((inactivation, index) => {
                    this.overviewRow.newInactivations += inactivation.newlyCreated;
                    this.tableRows[index].newInactivations = inactivation.newlyCreated;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });
        });
    }

    percentage(a, b) {
        return (a / b) * 100;
    }
}
