import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralReleaseStatisticsComponent } from './components/general-release-statistics/general-release-statistics.component';
import { NewConceptsComponent } from './components/new-concepts/new-concepts.component';
import { InactivatedConceptsComponent } from './components/inactivated-concepts/inactivated-concepts.component';
import { ConceptChangesCountsComponent } from './components/concept-changes-counts/concept-changes-counts.component';
import { DescriptiveStatisticsComponent } from './components/descriptive-statistics/descriptive-statistics.component';
import {ReleaseSummaryComponent} from './components/release-summary/release-summary.component';
import {AppComponent} from './app.component';

const routes: Routes = [
    {
        path: ':extension',
        component: AppComponent,
        children: [
            {
                path: ':view',
                component: AppComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    // imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
