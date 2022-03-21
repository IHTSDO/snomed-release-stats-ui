import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReleaseStatisticsComponent } from './components/general-release-statistics/general-release-statistics.component';
import { NewConceptsComponent } from './components/new-concepts/new-concepts.component';
import { InactivatedConceptsComponent } from './components/inactivated-concepts/inactivated-concepts.component';
import { ConceptChangesCountsComponent } from './components/concept-changes-counts/concept-changes-counts.component';
import { PatternsComponent } from './components/patterns/patterns.component';
import { DescriptiveStatisticsComponent } from './components/descriptive-statistics/descriptive-statistics.component';
import {ReleaseSummaryComponent} from './components/release-summary/release-summary.component';

const routes: Routes = [
    { path: '', redirectTo: '/descriptive-statistics', pathMatch: 'full' },
    { path: 'descriptive-statistics', component: DescriptiveStatisticsComponent },
    { path: 'generalReleaseStatistics', component: GeneralReleaseStatisticsComponent },
    { path: 'newConcepts', component: NewConceptsComponent },
    { path: 'inactivatedConcepts', component: InactivatedConceptsComponent },
    { path: 'conceptChangesCounts', component: ConceptChangesCountsComponent },
    { path: 'releaseSummary', component: ReleaseSummaryComponent },
    { path: 'patterns', component: PatternsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
