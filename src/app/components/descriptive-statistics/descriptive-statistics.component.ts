import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { S3Service } from '../../services/s3/s3.service';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {AuthoringService} from '../../services/authoring/authoring.service';

export class GraphData {
    labels: string[];
    datasets: DataSet[];

    constructor(labels, datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }
}

export class DataSet {
    data: any;
    backgroundColor: string[];

    constructor(data, backgroundColor) {
        this.data = data;
        this.backgroundColor = backgroundColor;
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
    chart5Data: any;

    pieChartOptions: any = {
        aspectRatio: 2,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                onClick: false
            },

            datalabels: {
                color: '#EEEEEE',
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
    barChartOptions: any = {
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            datalabels: {
                color: '#EEEEEE',
                formatter: (value) => {
                    return value += '%';
                },
            }
        }
    };
    countPieChartOptions: any = {
        plugins: {
            tooltip: {
                enabled: true
            },
            legend: {
                display: false
            },
            datalabels: {
                color: '#EEEEEE',
                formatter: (value) => {
                    if (value < 100) {
                        return '';
                    } else {
                        return value;
                    }
                },
            }
        }
    };
    backgroundColors: string[] = [
        '#1d6a9a',
        '#51851a',
        '#62536d',
        '#804a45',
        '#781515',
        '#ada82e',
        '#ba671e',
        '#a65d30',
        '#4f421b',
        '#55ae55',
        '#0a4e79',
        '#647346',
        '#1a6629',
        '#36948d',
        '#96823b',
        '#589965',
        '#b58982',
        '#166fce',
        '#c6cb6d',
        '#367ba5'
    ];

    filePath: any;
    filePathSubscription: Subscription;

    constructor(private authoringService: AuthoringService, private s3Service: S3Service, private toastr: ToastrService) {
        this.filePathSubscription = this.s3Service.getFilePath().subscribe(filePath => {
            this.filePath = filePath;
            this.getStats();
        });
    }

    public pieChartPlugins = [pluginDataLabels];

    ngOnInit(): void {
        this.getStats();
    }

    getStats() {
        this.s3Service.getConceptStatistics().subscribe(data => {
            this.constructChart1Data(data);
            this.constructChart2Data(data);
            this.constructChart3Data(data);
            this.constructChart4Data(data);
            this.constructChart5Data(data);
        }, error => {
            this.toastr.error('Data not found in S3', 'ERROR');
        });
    }

    constructChart1Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.totalActive, 10);
        });

        data = this.parameterSort(data, 'totalActive');

        data.forEach(item => {
            labels.push(item.name.replace(/ *\([^)]*\) */g, ''));
            dataSet.data.push(Math.floor((parseInt(item.totalActive, 10) / total) * 100));
        });

        this.chart1Data = new GraphData(labels, [dataSet]);
    }

    constructChart2Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.totalActive, 10);
        });

        data = this.parameterSort(data, 'totalActive');

        data.forEach(item => {
            if (dataSet.data.length < 10) {
                labels.push(item.name.replace(/ *\([^)]*\) */g, ''));
                dataSet.data.push(Math.floor((parseInt(item.totalActive, 10) / total) * 100));
            }
        });

        this.chart2Data = new GraphData(labels, [dataSet]);
    }

    constructChart3Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.newlyCreated, 10);
        });

        data = this.parameterSort(data, 'newlyCreated');

        data.forEach(item => {
            labels.push(item.name.replace(/ *\([^)]*\) */g, ''));
            dataSet.data.push(parseInt(item.newlyCreated, 10));
        });

        this.chart3Data = new GraphData(labels, [dataSet]);
    }

    constructChart4Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.inactivated, 10);
        });

        data = this.parameterSort(data, 'inactivated');

        data.forEach(item => {
            labels.push(item.name.replace(/ *\([^)]*\) */g, ''));
            dataSet.data.push(parseInt(item.inactivated, 10));
        });

        this.chart4Data = new GraphData(labels, [dataSet]);
    }

    constructChart5Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.changed, 10);
        });

        data = this.parameterSort(data, 'changed');

        data.forEach(item => {
            labels.push(item.name.replace(/ *\([^)]*\) */g, ''));
            dataSet.data.push(parseInt(item.changed, 10));
        });

        this.chart5Data = new GraphData(labels, [dataSet]);
    }

    dataExists(chartData) {
        return !(!chartData || chartData.datasets[0].data.every(item => item === 0));
    }

    parameterSort(array, name) {
        return array.sort((a, b) => {
            return b[name] - a[name];
        });
    }
}
