import { Component, OnInit } from '@angular/core';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {AuthoringService} from '../../services/authoring/authoring.service';

export class TableRow {
    name: string;
    inactivated: number;
    total: number;
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

    constructor(name, inactivated, total, ambiguous, movedElsewhere, conceptNonCurrent, duplicate, erroneous, inappropriate,
                limited, outdated, pendingMove, nonConformance, notEquivalent) {
        this.name = name;
        this.inactivated = inactivated;
        this.total = total;
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

    activeExtension: any;
    activeExtensionSubscription: Subscription;

    constructor(private s3Service: S3Service,
                private authoringService: AuthoringService) {
        this.activeExtensionSubscription = this.authoringService.getActiveExtension().subscribe(extension => {
            if (this.activeExtension && this.activeExtension.shortName !== extension['shortName']) {
                this.getStats();
            }
            this.activeExtension = extension;
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
                this.overviewRow.total += item.total;
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
                    this.overviewRow.inactivated += item.inactivations;

                    this.tableRows.push(
                        {
                            name: item.name,
                            inactivated: item.inactivations,
                            total: 0,
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
            });
        });
    }

    percentage(a, b) {
        return (a / b) * 100;
    }
}
