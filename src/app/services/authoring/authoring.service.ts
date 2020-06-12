import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Versions } from '../../models/versions';

@Injectable({
    providedIn: 'root'
})
export class AuthoringService {

    public environmentEndpoint: string;

    constructor(private http: HttpClient) {
        this.environmentEndpoint = window.location.origin + '/';
    }

    getVersions(): Observable<Versions> {
        return this.http.get<Versions>('../snowstorm/snomed-ct/codesystems/SNOMEDCT/versions?showFutureVersions=false');
    }
}
