import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
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
        provideAnimations(),
        provideRouter(routes),
        provideToastr()

    ]
};