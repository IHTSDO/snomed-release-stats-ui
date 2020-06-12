import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { S3Service } from '../../services/s3/s3.service';

export class GraphData {
    labels: string[];
    datasets: DataSet[];

    constructor(labels, datasets) {
        this.labels = labels;
        this.datasets = datasets;
    }
}

export class DataSet {
    data: number[];
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
        legend: {
            display: true,
            position: 'right',
            onClick: false
        },
        plugins: {
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
        legend: {
            display: false,
            position: 'bottom'
        },
        plugins: {
            datalabels: {
                color: '#EEEEEE',
                formatter: (value) => {
                    return value += '%';
                },
            }
        }
    };
    countPieChartOptions: any = {
        legend: {
            display: false,
            position: 'right'
        },
        plugins: {
            datalabels: {
                color: '#EEEEEE',
                formatter: (value) => {
                    if (value < 10) {
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
        '#166fce'
    ];

    constructor(private s3Service: S3Service) {
    }

    public pieChartPlugins = [pluginDataLabels];

    ngOnInit(): void {
        this.s3Service.getConceptStatistics().subscribe(data => {
            this.constructChart1Data(data);
            this.constructChart2Data(data);
            this.constructChart3Data(data);
            this.constructChart4Data(data);
            this.constructChart5Data(data);
        });
    }

    constructChart1Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.total, 10);
        });

        data = this.parameterSort(data, 'total');

        data.forEach(item => {
            labels.push(item.name.slice(0, -item.semTag.length));
            dataSet.data.push(Math.floor((parseInt(item.total, 10) / total) * 100));
        });

        this.chart1Data = new GraphData(labels, [dataSet]);
    }

    constructChart2Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.total, 10);
        });

        data = this.parameterSort(data, 'total');

        data.forEach(item => {
            if (parseInt(item.total, 10) > 4000) {
                labels.push(item.name.slice(0, -item.semTag.length));
                dataSet.data.push(Math.floor((parseInt(item.total, 10) / total) * 100));
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
            labels.push(item.name.slice(0, -item.semTag.length));
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
            labels.push(item.name.slice(0, -item.semTag.length));
            dataSet.data.push(parseInt(item.inactivated, 10));
        });

        this.chart4Data = new GraphData(labels, [dataSet]);
    }

    constructChart5Data(data) {
        const dataSet = new DataSet([], this.backgroundColors);
        const labels: string[] = [];
        let total = 0;

        data.forEach(item => {
            total += parseInt(item.changedStatus, 10);
        });

        data = this.parameterSort(data, 'changedStatus');

        data.forEach(item => {
            labels.push(item.name.slice(0, -item.semTag.length));
            dataSet.data.push(parseInt(item.changedStatus, 10));
        });

        this.chart5Data = new GraphData(labels, [dataSet]);
    }

    parameterSort(array, name) {
        return array.sort((a, b) => {
            return b[name] - a[name];
        });
    }
}
