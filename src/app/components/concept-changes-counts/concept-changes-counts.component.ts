import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export class TableRow {
    name: string;
    changed: number;
    statedChanged: number;
    inferredChanged: number;
    descriptionChanged: number;
    total: number;

    constructor(name, changed, statedChanged, inferredChanged, descriptionChanged, total) {
        this.name = name;
        this.changed = changed;
        this.statedChanged = statedChanged;
        this.inferredChanged = inferredChanged;
        this.descriptionChanged = descriptionChanged;
        this.total = total;
    }
}

@Component({
    selector: 'app-concept-changes-counts',
    templateUrl: './concept-changes-counts.component.html',
    styleUrls: ['./concept-changes-counts.component.scss']
})
export class ConceptChangesCountsComponent implements OnInit {

    overviewRow: TableRow;
    tableRows: TableRow[] = [];
    percentages = false;

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
                this.overviewRow.total += concept.total;
                this.tableRows.push({
                    name: concept.name,
                    changed: 0,
                    statedChanged: 0,
                    inferredChanged: 0,
                    descriptionChanged: 0,
                    total: concept.total
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
