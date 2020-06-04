import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hierarchy } from '../../models/hierarchy';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class S3Service {

    constructor(private http: HttpClient) {
    }

    getConceptStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>('s3/MAIN/latest/sheet1.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            console.log('CONCEPTS: ', response);

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
                report.push(hierarchy);
            });

            return report;
        }));
    }

    getDescriptionStatistics(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>('s3/MAIN/latest/sheet2.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            console.log('DESCRIPTIONS: ', response);

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
        return this.http.get<Hierarchy[]>('s3/MAIN/latest/sheet3.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            console.log('RELATIONSHIPS: ', response);

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
}