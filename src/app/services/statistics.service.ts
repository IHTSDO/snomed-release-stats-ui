import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    constructor(private http: HttpClient) {
    }

    getStatistics(): Observable<object> {
        return this.http.get<object>('https://snomed-reporting-public.s3.amazonaws.com/authoring/reporting-service/dev/jobs/SummaryComponentStats/runs/MAIN/latest/sheet1.json');
    }
}
