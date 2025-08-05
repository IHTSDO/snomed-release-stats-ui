import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';

export class TableRow {
    name: string;
    changed: number;
    statedChanged: number;
    inferredChanged: number;
    descriptionChanged: number;
    totalActive: number;

    constructor(name, changed, statedChanged, inferredChanged, descriptionChanged, totalActive) {
        this.name = name;
        this.changed = changed;
        this.statedChanged = statedChanged;
        this.inferredChanged = inferredChanged;
        this.descriptionChanged = descriptionChanged;
        this.totalActive = totalActive;
    }
}

@Component({
    selector: 'app-concept-changes-counts',
    templateUrl: './concept-changes-counts.component.html',
    styleUrls: ['./concept-changes-counts.component.scss'],
    imports: [NgFor, NgIf, DecimalPipe]
})
export class ConceptChangesCountsComponent implements OnInit {

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

        this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0, 0, 0, 0);

        this.s3Service.getConceptStatistics().subscribe(concepts => {
            concepts.forEach(concept => {
                this.overviewRow.totalActive += concept.totalActive;
                this.tableRows.push({
                    name: concept.name,
                    changed: 0,
                    statedChanged: 0,
                    inferredChanged: 0,
                    descriptionChanged: 0,
                    totalActive: concept.totalActive
                });
            });

            this.s3Service.getAxiomStatistics().subscribe(axioms => {
                axioms.forEach((axiom, index) => {
                    this.overviewRow.statedChanged += axiom.conceptsAffected;
                    this.tableRows[index].statedChanged = axiom.conceptsAffected;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });

            this.s3Service.getRelationshipStatistics().subscribe(relationships => {
                relationships.forEach((relationship, index) => {
                    this.overviewRow.inferredChanged += relationship.conceptsAffected;
                    this.tableRows[index].inferredChanged = relationship.conceptsAffected;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });

            this.s3Service.getDescriptionStatistics().subscribe(descriptions => {
                descriptions.forEach((description, index) => {
                    this.overviewRow.descriptionChanged += description.conceptsAffected;
                    this.tableRows[index].descriptionChanged = description.conceptsAffected;
                });
            }, error => {
                this.toastr.error('Data not found in S3', 'ERROR');
            });
        }, error => {
            this.toastr.error('Data not found in S3', 'ERROR');
        });
    }

    percentage(a, b) {
        return (a / b) * 100;
    }
}
