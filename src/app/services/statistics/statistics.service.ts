import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    private summaryComponentStats = new Subject<any>();

    constructor() {
    }

    // Setters & Getters: Attributes
    setSummaryComponentStats(statistics) {
        console.log('SUMMARY COMPONENT STATS: ', statistics);
        this.summaryComponentStats.next(statistics);
    }

    getSummaryComponentStats(): Observable<any> {
        return this.summaryComponentStats.asObservable();
    }
}
