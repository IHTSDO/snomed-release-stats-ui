import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Versions } from '../../models/versions';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;

    private versions = new Subject();
    private aggregator = new BehaviorSubject(true);

    private extensions = new Subject();
    private activeExtension = new Subject();

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    // VERSION
    setVersions(versions) {
        this.versions.next(versions);
    }

    getVersions() {
        return this.versions.asObservable();
    }

    httpGetVersions(extension: string): Observable<Versions> {
        return this.http.get<Versions>('../snowstorm/snomed-ct/codesystems/' + extension + '/versions?showFutureVersions=false');
    }

    // AGGREGATOR
    setAggregator(aggregator) {
        this.aggregator.next(aggregator);
    }

    getAggregator() {
        return this.aggregator.asObservable();
    }

    // EXTENSIONS
    setExtensions(extensions) {
        this.extensions.next(extensions);
    }

    getExtensions() {
        return this.extensions.asObservable();
    }

    setActiveExtension(extension) {
        this.activeExtension.next(extension);
    }

    getActiveExtension() {
        return this.activeExtension.asObservable();
    }

    httpGetExtensions(): Observable<Versions> {
        return this.http.get('/snowstorm/snomed-ct/codesystems').pipe(map(data => {
            return data['items'];
        }));
    }

    httpGetBranchMetadata(extension): Observable<any> {
        return this.http.get('/snowstorm/snomed-ct/branches/MAIN/' + extension).pipe(map(data => {
            return data['metadata'];
        }));
    }
}
