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
                    hierarchy.sctId = item[0];
                    hierarchy.name = item[1];
                    hierarchy.semTag = item[2];
                    hierarchy.newlyCreated = item[3];
                    hierarchy.changedStatus = item[4];
                    hierarchy.inactivated = item[5];
                    hierarchy.newWithNewConcept = item[6];
                    hierarchy.newSD = item[7];
                    hierarchy.newP = item[8];
                    hierarchy.total = item[9];
                    report.push(hierarchy);
                }
            });

            return report;
        }));
    }
}
