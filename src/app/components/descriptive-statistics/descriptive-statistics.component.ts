import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-descriptive-statistics',
    templateUrl: './descriptive-statistics.component.html',
    styleUrls: ['./descriptive-statistics.component.scss']
})
export class DescriptiveStatisticsComponent implements OnInit {

    activeConceptsData: any;
    newConceptsData: any;
    pieChartOptions: any;
    barChartOptions: any;
    countPieChartOptions: any;

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
                    data: [32, 17, 11, 10, 8, 6, 4, 2],
                    dataLabel: '#FFFFFF',
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

        this.pieChartOptions = {
            legend: {
                position: 'right'
            },
            plugins: {
                datalabels: {
                    color: '#E6E9EE',
                    formatter: (value) => {
                        if (value < 3) {
                            return '';
                        } else {
                            return value += '%';
                        }
                    },
                }
            }
        };

        this.barChartOptions = {
            legend: {
                display: false,
                position: 'bottom'
            },
            plugins: {
                datalabels: {
                    color: '#E6E9EE',
                    formatter: (value) => {
                        return value += '%';
                    },
                }
            }
        };

        this.countPieChartOptions = {
            legend: {
                position: 'right'
            },
            plugins: {
                datalabels: {
                    color: '#E6E9EE',
                    formatter: (value) => {
                        if (value < 200) {
                            return '';
                        } else {
                            return value;
                        }
                    },
                }
            }
        };
    }

    public pieChartPlugins = [pluginDataLabels];

    ngOnInit(): void {
    }

}
