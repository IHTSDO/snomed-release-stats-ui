import { Injectable } from '@angular/core';
import {Observable, of, Subject, Subscription} from 'rxjs';
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
        if (this.localFilePath) {
            return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet1.json').pipe(map(response => {
                const report: Hierarchy[] = [];

                response.forEach(item => {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = parseInt(item['New'], 10);
                    hierarchy.changed = parseInt(item['Changed'], 10);
                    hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                    hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                    hierarchy.newInactive = parseInt(item['New Inactive'], 10);
                    hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                    hierarchy.movedModule = parseInt(item['Moved Module'], 10);
                    hierarchy.changedInactive = parseInt(item['Changed Inactive'], 10);
                    hierarchy.sd = parseInt(item['New SD'], 10);
                    hierarchy.p = parseInt(item['New P'], 10);
                    hierarchy.totalActive = parseInt(item['Total Active'], 10);
                    hierarchy.total = parseInt(item['Total'], 10);
                    hierarchy.promoted = parseInt(item['Promoted'], 10);
                    report.push(hierarchy);
                });

                return report;
            }));
        } else {
            return of([]);
        }
    }

    getDescriptionStatistics(): Observable<Hierarchy[]> {
        if (this.localFilePath) {
            return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet2.json').pipe(map(response => {
                const report: Hierarchy[] = [];

                response.forEach(item => {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = parseInt(item['New'], 10);
                    hierarchy.changed = parseInt(item['Changed'], 10);
                    hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                    hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                    hierarchy.newInactive = parseInt(item['New Inactive'], 10);
                    hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                    hierarchy.changedInactive = parseInt(item['Changed Inactive'], 10);
                    hierarchy.totalActive = parseInt(item['Total Active'], 10);
                    hierarchy.total = parseInt(item['Total'], 10);
                    hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                    report.push(hierarchy);
                });

                return report;
            }));
        } else {
            return of([]);
        }
    }

    getRelationshipStatistics(): Observable<Hierarchy[]> {
        if (this.localFilePath) {
            return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet3.json').pipe(map(response => {
                const report: Hierarchy[] = [];

                response.forEach(item => {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = parseInt(item['New'], 10);
                    hierarchy.changed = parseInt(item['Changed'], 10);
                    hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                    hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                    hierarchy.newInactive = parseInt(item['New Inactive'], 10);
                    hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                    hierarchy.changedInactive = parseInt(item['Changed Inactive'], 10);
                    hierarchy.totalActive = parseInt(item['Total Active'], 10);
                    hierarchy.total = parseInt(item['Total'], 10);
                    hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                    report.push(hierarchy);
                });

                return report;
            }));
        } else {
            return of([]);
        }
    }

    getAxiomStatistics(): Observable<Hierarchy[]> {
        if (this.localFilePath) {
            return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet5.json').pipe(map(response => {
                const report: Hierarchy[] = [];

                response.forEach(item => {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = parseInt(item['New'], 10);
                    hierarchy.changed = parseInt(item['Changed'], 10);
                    hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                    hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                    hierarchy.newInactive = parseInt(item['New Inactive'], 10);
                    hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                    hierarchy.changedInactive = parseInt(item['Changed Inactive'], 10);
                    hierarchy.totalActive = parseInt(item['Total Active'], 10);
                    hierarchy.total = parseInt(item['Total'], 10);
                    hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                    report.push(hierarchy);
                });

                return report;
            }));
        } else {
            return of([]);
        }
    }

    getInactivationStatistics(): Observable<Hierarchy[]> {
        if (this.localFilePath) {
            return this.http.get<Hierarchy[]>(this.s3Path + this.localFilePath + '/latest/sheet7.json').pipe(map(response => {
                const report: Hierarchy[] = [];

                response.forEach(item => {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = parseInt(item['New'], 10);
                    hierarchy.changed = parseInt(item['Changed'], 10);
                    hierarchy.inactivated = parseInt(item['Inactivated'], 10);
                    hierarchy.reactivated = parseInt(item['Reactivated'], 10);
                    hierarchy.newInactive = parseInt(item['New Inactive'], 10);
                    hierarchy.newWithNewConcept = parseInt(item['New with New Concept'], 10);
                    hierarchy.changedInactive = parseInt(item['Changed Inactive'], 10);
                    hierarchy.totalActive = parseInt(item['Total Active'], 10);
                    hierarchy.total = parseInt(item['Total'], 10);
                    hierarchy.conceptsAffected = parseInt(item['Concepts Affected'], 10);
                    report.push(hierarchy);
                });

                return report;
            }));
        } else {
            return of([]);
        }
    }

    getReleaseSummary(): Observable<any> {
        if (this.localRSFilePath) {
            return this.http.get(this.s3Path + this.localRSFilePath);
        } else {
            return of([]);
        }
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
