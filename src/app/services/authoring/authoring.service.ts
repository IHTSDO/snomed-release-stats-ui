import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Versions } from '../../models/versions';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;

    private versions = new Subject();
    private activeVersion = new Subject();

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    // // BRANCH
    // setActiveBranch(branch) {
    //     this.activeBranch.next(branch);
    // }
    //
    // getActiveBranch() {
    //     return this.activeBranch.asObservable();
    // }
    //
    // setBranches(branches) {
    //     this.branches.next(branches);
    // }
    //
    // getBranches() {
    //
    // }

    getVersions(): Observable<Versions> {
        return this.http.get<Versions>('../snowstorm/snomed-ct/codesystems/SNOMEDCT/versions?showFutureVersions=false');
    }
}
