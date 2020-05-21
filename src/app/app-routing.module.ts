import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReleaseStatisticsComponent } from './components/general-release-statistics/general-release-statistics.component';
import { NewConceptsComponent } from './components/new-concepts/new-concepts.component';
import { InactivatedConceptsComponent } from './components/inactivated-concepts/inactivated-concepts.component';
import { ConceptChangesCountsComponent } from './components/concept-changes-counts/concept-changes-counts.component';
import { ConceptChangesPercentagesComponent } from './components/concept-changes-percentages/concept-changes-percentages.component';
import { PatternsComponent } from './components/patterns/patterns.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'generalReleaseStatistics', component: GeneralReleaseStatisticsComponent },
    { path: 'newConcepts', component: NewConceptsComponent },
    { path: 'inactivatedConcepts', component: InactivatedConceptsComponent },
    { path: 'conceptChangesCounts', component: ConceptChangesCountsComponent },
    { path: 'conceptChangesPercentages', component: ConceptChangesPercentagesComponent },
    { path: 'patterns', component: PatternsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
