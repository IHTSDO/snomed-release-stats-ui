import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { AuthoringService } from './services/authoring/authoring.service';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { GeneralReleaseStatisticsComponent } from './components/general-release-statistics/general-release-statistics.component';
import { NewConceptsComponent } from './components/new-concepts/new-concepts.component';
import { InactivatedConceptsComponent } from './components/inactivated-concepts/inactivated-concepts.component';
import { ConceptChangesCountsComponent } from './components/concept-changes-counts/concept-changes-counts.component';
import { PatternsComponent } from './components/patterns/patterns.component';
import { DescriptiveStatisticsComponent } from './components/descriptive-statistics/descriptive-statistics.component';
import { BreadcrumbBarComponent } from './components/breadcrumb-bar/breadcrumb-bar.component';
import { S3Service } from './services/s3/s3.service';
import { BranchingService } from './services/branching/branching.service';
import { ReleaseSummaryComponent } from './components/release-summary/release-summary.component';
import { TitleFormatterPipe } from './pipes/title-formatter.pipe';
import { DateOrderPipe } from './pipes/date-order.pipe';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { DateAggregatorPipe } from './pipes/date-aggregator.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        GeneralReleaseStatisticsComponent,
        NewConceptsComponent,
        InactivatedConceptsComponent,
        ConceptChangesCountsComponent,
        PatternsComponent,
        DescriptiveStatisticsComponent,
        BreadcrumbBarComponent,
        ReleaseSummaryComponent,
        TitleFormatterPipe,
        DateOrderPipe,
        DateFormatterPipe,
        DateAggregatorPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbTypeaheadModule,
        ChartModule,
        AppRoutingModule,
    ],
    providers: [
        AuthoringService,
        BranchingService,
        S3Service,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
