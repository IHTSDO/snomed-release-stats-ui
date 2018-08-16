import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExampleServiceService } from './services/example-service.service';
import { AppComponent } from './app.component';
import { ExampleConceptSearchPipe } from './pipes/example-concept-search.pipe';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { ExampleComponentComponent } from './components/example-component/example-component.component';

@NgModule({
    declarations: [
        AppComponent,
        ExampleConceptSearchPipe,
        ExamplePageComponent,
        ExampleComponentComponent
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
