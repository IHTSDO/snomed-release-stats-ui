import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { Subscription } from 'rxjs';
import { Hierarchy } from '../../models/hierarchy';

export class DataSet {
    labels: string[];
    datasets: object[];

    constructor(labels, datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }
}

@Component({
    selector: 'app-descriptive-statistics',
    templateUrl: './descriptive-statistics.component.html',
    styleUrls: ['./descriptive-statistics.component.scss']
})
export class DescriptiveStatisticsComponent implements OnInit {

    chart1Data: any;
    chart2Data: any;
    chart3Data: any;
    chart4Data: any;
    newData: any = {
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
                data: [],
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
    pieChartOptions: any;
    barChartOptions: any;
    countPieChartOptions: any;

    summaryComponentStats: Hierarchy[];
    SCSSubscription: Subscription;

    labels: string[] = [
        'Clinical Finding',
        'Procedure',
        'Body Structure',
        'Organism',
        'Substance',
        'Pharmaceutical Product',
        'Physical Object',
        'Qualifier Value'
    ];
    dataLabel: '#FFFFFF';
    backgroundColors: string[] = [
        '#1d6a9a',
        '#51851a',
        '#62536d',
        '#804a45',
        '#781515',
        '#ada82e',
        '#ba671e',
        '#a65d30'
    ];

    constructor(private statisticsService: StatisticsService) {
        this.SCSSubscription = this.statisticsService.getSummaryComponentStats().subscribe(data => this.summaryComponentStats = data);
        this.pieChartOptions = {
            legend: {
                display: true,
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
                display: true,
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
