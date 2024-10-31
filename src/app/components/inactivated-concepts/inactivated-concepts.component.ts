import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export class TableRow {
    name: string;
    totalActive: number;
    inactivated: number;
    ambiguous: number;
    movedElsewhere: number;
    conceptNonCurrent: number;
    duplicate: number;
    erroneous: number;
    inappropriate: number;
    limited: number;
    outdated: number;
    pendingMove: number;
    nonConformance: number;
    notEquivalent: number;

    constructor(name,
                totalActive,
                inactivated,
                ambiguous,
                movedElsewhere,
                conceptNonCurrent,
                duplicate,
                erroneous,
                inappropriate,
                limited,
                outdated,
                pendingMove,
                nonConformance,
                notEquivalent) {
        this.name = name;
        this.totalActive = totalActive;
        this.inactivated = inactivated;
        this.ambiguous = ambiguous;
        this.movedElsewhere = movedElsewhere;
        this.conceptNonCurrent = conceptNonCurrent;
        this.duplicate = duplicate;
        this.erroneous = erroneous;
        this.inappropriate = inappropriate;
        this.limited = limited;
        this.outdated = outdated;
        this.pendingMove = pendingMove;
        this.nonConformance = nonConformance;
        this.notEquivalent = notEquivalent;
    }
}

@Component({
    selector: 'app-inactivated-concepts',
    templateUrl: './inactivated-concepts.component.html',
    styleUrls: ['./inactivated-concepts.component.scss']
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

        this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        this.s3Service.getConceptStatistics().subscribe(concepts => {
            concepts.forEach(concept => {
                this.overviewRow.totalActive += concept.totalActive;

                this.tableRows.push({
                    name: concept.name,
                    totalActive: concept.totalActive,
                    inactivated: 0,
                    ambiguous: 0,
                    movedElsewhere: 0,
                    conceptNonCurrent: 0,
                    duplicate: 0,
                    erroneous: 0,
                    inappropriate: 0,
                    limited: 0,
                    outdated: 0,
                    pendingMove: 0,
                    nonConformance: 0,
                    notEquivalent: 0
                });
            });

            this.s3Service.getInactivationStatistics().subscribe(inactivations => {
                inactivations.forEach((inactivation, index) => {
                    this.overviewRow.inactivated += inactivation.newlyCreated;
                    this.overviewRow.ambiguous += inactivation.ambiguous;
                    this.overviewRow.movedElsewhere += inactivation.movedElsewhere;
                    this.overviewRow.conceptNonCurrent += inactivation.conceptNonCurrent;
                    this.overviewRow.duplicate += inactivation.duplicate;
                    this.overviewRow.erroneous += inactivation.erroneous;
                    this.overviewRow.inappropriate += inactivation.inappropriate;
                    this.overviewRow.limited += inactivation.limited;
                    this.overviewRow.outdated += inactivation.outdated;
                    this.overviewRow.pendingMove += inactivation.pendingMove;
                    this.overviewRow.nonConformance += inactivation.nonConformance;
                    this.overviewRow.notEquivalent += inactivation.notEquivalent;

                    this.tableRows[index].inactivated = inactivation.newlyCreated;
                    this.tableRows[index].ambiguous = inactivation.ambiguous;
                    this.tableRows[index].movedElsewhere = inactivation.movedElsewhere;
                    this.tableRows[index].conceptNonCurrent = inactivation.conceptNonCurrent;
                    this.tableRows[index].duplicate = inactivation.duplicate;
                    this.tableRows[index].erroneous = inactivation.erroneous;
                    this.tableRows[index].inappropriate = inactivation.inappropriate;
                    this.tableRows[index].limited = inactivation.limited;
                    this.tableRows[index].outdated = inactivation.outdated;
                    this.tableRows[index].pendingMove = inactivation.pendingMove;
                    this.tableRows[index].nonConformance = inactivation.nonConformance;
                    this.tableRows[index].notEquivalent = inactivation.notEquivalent;
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
