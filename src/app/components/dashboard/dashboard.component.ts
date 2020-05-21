import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    activeConceptsData: any;
    newConceptsData: any;
    options: any;

    constructor() {
        this.activeConceptsData = {
            labels: [
                'Clinical Finding',
                'Procedure',
                'Body Structure',
                'Organism',
                'Substance',
                'Pharmaceutical Product',
                'Physical Object',
                'Qualifier Value'
            ],
            datasets: [
                {
                    data: [32, 17, 11, 10, 8, 6, 4, 3],
                    backgroundColor: [
                        '#1d6a9a',
                        '#51851a',
                        '#62536d',
                        '#804a45',
                        '#781515',
                        '#ada82e',
                        '#ba671e',
                        '#a65d30'
                    ],
                    hoverBackgroundColor: [
                        '#1d6a9a',
                        '#51851a',
                        '#62536d',
                        '#804a45',
                        '#781515',
                        '#ada82e',
                        '#ba671e',
                        '#a65d30'
                    ]
                }]
        };

        this.newConceptsData = {
            labels: [
                'Clinical Finding',
                'Procedure',
                'Body Structure',
                'Organism',
                'Substance',
                'Pharmaceutical Product',
                'Physical Object',
                'Qualifier Value'
            ],
            datasets: [
                {
                    data: [1206, 215, 451, 141, 125, 1929, 44, 149],
                    backgroundColor: [
                        '#1d6a9a',
                        '#51851a',
                        '#62536d',
                        '#804a45',
                        '#781515',
                        '#ada82e',
                        '#ba671e',
                        '#a65d30'
                    ],
                    hoverBackgroundColor: [
                        '#1d6a9a',
                        '#51851a',
                        '#62536d',
                        '#804a45',
                        '#781515',
                        '#ada82e',
                        '#ba671e',
                        '#a65d30'
                    ]
                }]
        };

        this.options = {
            legend: {
                position: 'right'
            }
        };
    }

    ngOnInit(): void {
    }

}
