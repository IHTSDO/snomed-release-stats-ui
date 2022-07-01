import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import { Hierarchy } from '../../models/hierarchy';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class S3Service {

    private filePath = new Subject<string>();
    private rsFilePath = new Subject<string>();

    localFilePath: any;
    localFilePathSubscription: Subscription;
    localRSFilePath: any;
    localRSFilePathSubscription: Subscription;

    private s3Path = '../reporting-s3/jobs/SummaryComponentStats';

    constructor(private http: HttpClient) {
        this.localFilePathSubscription = this.getFilePath().subscribe(data => this.localFilePath = data);
        this.localRSFilePathSubscription = this.getRSFilePath().subscribe(data => this.localRSFilePath = data);
    }

    getConceptStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet1.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            response.forEach(item => {
                const hierarchy: Hierarchy = new Hierarchy();
                hierarchy.sctId = item['Sctid'];
                hierarchy.name = item['Hierarchy'];
                hierarchy.semTag = item['SemTag'];
                hierarchy.newlyCreated = parseInt(item['New'], 10);
                hierarchy.changedStatus = parseInt(item['Changed DefnStatus'], 10);
                hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                hierarchy.sd = parseInt(item['New SD'], 10);
                hierarchy.p = parseInt(item['New P'], 10);
                hierarchy.total = parseInt(item['Total'], 10);
                hierarchy.totalActive = parseInt(item['Total Active'], 10);
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getDescriptionStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet2.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            response.forEach(item => {
                const hierarchy: Hierarchy = new Hierarchy();
                hierarchy.sctId = item['Sctid'];
                hierarchy.name = item['Hierarchy'];
                hierarchy.semTag = item['SemTag'];
                hierarchy.newlyCreated = parseInt(item['New / Reactivated'], 10);
                hierarchy.changedStatus = parseInt(item['Changed'], 10);
                hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                hierarchy.total = parseInt(item['Total'], 10);
                hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getRelationshipStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet3.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            response.forEach(item => {
                const hierarchy: Hierarchy = new Hierarchy();
                hierarchy.sctId = item['Sctid'];
                hierarchy.name = item['Hierarchy'];
                hierarchy.semTag = item['SemTag'];
                hierarchy.newlyCreated = parseInt(item['New'], 10);
                hierarchy.changedStatus = parseInt(item['Changed'], 10);
                hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                hierarchy.total = parseInt(item['Total'], 10);
                hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getAxiomStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet4.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            response.forEach(item => {
                const hierarchy: Hierarchy = new Hierarchy();
                hierarchy.sctId = item['Sctid'];
                hierarchy.name = item['Hierarchy'];
                hierarchy.semTag = item['SemTag'];
                hierarchy.newlyCreated = parseInt(item['New Axioms'], 10);
                hierarchy.changed = parseInt(item['Changed Axioms'], 10);
                hierarchy.inactivated = parseInt(item['Inactivated Axioms'], 10);
                hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                hierarchy.total = parseInt(item['Total'], 10);
                hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getInactivationStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet7.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            response.forEach(item => {
                const hierarchy: Hierarchy = new Hierarchy();
                hierarchy.sctId = item['Sctid'];
                hierarchy.name = item['Hierarchy'];
                hierarchy.semTag = item['SemTag'];
                hierarchy.inactivations = parseInt(item['Inactivations New / Reactivated'], 10);
                hierarchy.changedStatus = parseInt(item['Changed'], 10);
                hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                hierarchy.ambiguous = parseInt(item['Ambiguous'], 10);
                hierarchy.movedElsewhere = parseInt(item['Moved Elsewhere'], 10);
                hierarchy.conceptNonCurrent = parseInt(item['Concept Non Current'], 10);
                hierarchy.duplicate = parseInt(item['Duplicate'], 10);
                hierarchy.erroneous = parseInt(item['Erroneous'], 10);
                hierarchy.inappropriate = parseInt(item['Inappropriate'], 10);
                hierarchy.limited = parseInt(item['Limited'], 10);
                hierarchy.outdated = parseInt(item['Outdated'], 10);
                hierarchy.pendingMove = parseInt(item['Pending Move'], 10);
                hierarchy.nonConformance = parseInt(item['Non Conformance'], 10);
                hierarchy.notEquivalent = parseInt(item['Not Equivalent'], 10);
                hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getReleaseSummary(): Observable<any> {
        return this.http.get(this.s3Path + this.localRSFilePath);
    }

    // Setters & Getters: FilePath
    setFilePath(path) {
        this.filePath.next(path);
    }

    getFilePath(): Observable<string> {
        return this.filePath.asObservable();
    }

    // Setters & Getters: RSFilePath
    setRSFilePath(path) {
        this.rsFilePath.next(path);
    }

    getRSFilePath(): Observable<string> {
        return this.rsFilePath.asObservable();
    }
}
