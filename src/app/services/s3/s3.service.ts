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

    getSummaryComponentStats(): Observable<Hierarchy[]> {
        return this.http.get<Hierarchy[]>('s3/MAIN/latest/sheet1.json').pipe(map(response => {
            const report: Hierarchy[] = [];

            // console.log('RAW: ', response);

            response.forEach((item, index) => {
                if (index !== 0) {
                    const hierarchy: Hierarchy = new Hierarchy();
                    hierarchy.sctId = item['Sctid'];
                    hierarchy.name = item['Hierarchy'];
                    hierarchy.semTag = item['SemTag'];
                    hierarchy.newlyCreated = item['New'];
                    hierarchy.changedStatus = item['Changed DefnStatus'];
                    hierarchy.inactivated = item['Inactivated'];
                    hierarchy.reactivated = item['Reactivated'];
                    hierarchy.newWithNewConcept = item['New with New Concept'];
                    hierarchy.newSD = item['New SD'];
                    hierarchy.newP = item['New P'];
                    hierarchy.total = item['Total'];
                    report.push(hierarchy);
                }
            });

            return report;
        }));
    }
}
