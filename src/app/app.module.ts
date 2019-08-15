import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExampleServiceService } from './services/example-service.service';
import { AppComponent } from './app.component';
import { ExampleConceptSearchPipe } from './pipes/example-concept-search.pipe';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';

@NgModule({
    declarations: [
        AppComponent,
        ExampleConceptSearchPipe,
        SnomedNavbarComponent,
        SnomedFooterComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        ExampleServiceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
