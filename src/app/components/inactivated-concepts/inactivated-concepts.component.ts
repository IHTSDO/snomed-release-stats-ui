import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export class TableRow {
    name: string;
    inactivated: number;
    totalActive: number;
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

    constructor(name, inactivated, totalActive, ambiguous, movedElsewhere, conceptNonCurrent, duplicate, erroneous, inappropriate,
                limited, outdated, pendingMove, nonConformance, notEquivalent) {
        this.name = name;
        this.inactivated = inactivated;
        this.totalActive = totalActive;
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

        this.s3Service.getConceptStatistics().subscribe(concepts => {
            this.overviewRow = new TableRow('SNOMED CT Concept (SNOMED RT+CTV3)', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

            concepts.forEach(item => {
                this.overviewRow.totalActive += item.totalActive;
            });

            this.s3Service.getInactivationStatistics().subscribe(inactivations => {
                inactivations.forEach(item => {
                    this.overviewRow.ambiguous += item.ambiguous;
                    this.overviewRow.movedElsewhere += item.movedElsewhere;
                    this.overviewRow.conceptNonCurrent += item.conceptNonCurrent;
                    this.overviewRow.duplicate += item.duplicate;
                    this.overviewRow.erroneous += item.erroneous;
                    this.overviewRow.inappropriate += item.inappropriate;
                    this.overviewRow.limited += item.limited;
                    this.overviewRow.outdated += item.outdated;
                    this.overviewRow.pendingMove += item.pendingMove;
                    this.overviewRow.nonConformance += item.nonConformance;
                    this.overviewRow.notEquivalent += item.notEquivalent;
                    this.overviewRow.inactivated += item.newlyCreated;

                    this.tableRows.push(
                        {
                            name: item.name,
                            inactivated: item.newlyCreated,
                            totalActive: 0,
                            ambiguous: item.ambiguous,
                            movedElsewhere: item.movedElsewhere,
                            conceptNonCurrent: item.conceptNonCurrent,
                            duplicate: item.duplicate,
                            erroneous: item.erroneous,
                            inappropriate: item.inappropriate,
                            limited: item.limited,
                            outdated: item.outdated,
                            pendingMove: item.pendingMove,
                            nonConformance: item.nonConformance,
                            notEquivalent: item.notEquivalent
                        }
                    );
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
