import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { provideToastr } from "ngx-toastr";
import { ChartModule } from "primeng/chart";
import { routes } from "./app.routes";
import { headerInterceptorFn } from "./interceptors/header.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule, ChartModule),
        provideHttpClient(withInterceptors([headerInterceptorFn])),
        provideRouter(routes),
        provideToastr()
    ]
};