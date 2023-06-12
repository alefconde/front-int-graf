import { Component, OnInit, Input, SimpleChange } from '@angular/core';

import * as d3 from 'd3';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {


  @Input() year1: number = 0;
  @Input() month1: number = 0;
  @Input() year2: number = 0;
  @Input() month2: number = 0;
  @Input() province: string = "07";

  provinces = [
    { text: "Castilla y León", value: "07" },
    { text: "Ávila", value: "05" },
    { text: "Burgos", value: "09" },
    { text: "León", value: "24" },
    { text: "Palencia", value: "34" },
    { text: "Salamanca", value: "37" },
    { text: "Segovia", value: "40" },
    { text: "Soria", value: "42" },
    { text: "Valladolid", value: "47" },
    { text: "Zamora", value: "49" }
  ]

  datosParo = [];
  datosParoFiltro = [];
  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  }

  getPointRadius(context, data): number {
    let dato = data[context.dataIndex];
    if (dato.year == this.year1) return 10;
    return 0
  }

  ngAfterViewInit() {
    fetch('.../../../assets/paro.csv').then(res => res.text())
      .then(csv => d3.csvParse(csv, ({ fecha, cod, prov, lng, lat, paro }) => ({ fecha: fecha, cod: cod, prov: prov, lng: +lng, lat: +lat, paro: +paro })))
      .then(data => {
        this.datosParo = data.map(d => { d.month = +d.fecha.split("-")[1]; d.year = +d.fecha.split("-")[0]; return d; }).sort(function (a, b) {
          if (a.year === b.year) {
            return a.month - b.month;
          }
          return a.year > b.year ? 1 : -1;
        }); return this.datosParo;
      })
      .then(d => { this.datosParoFiltro = d.filter(d => d.cod == "37"); return this.datosParoFiltro })
      .then(d => {
        this.chart = new Chart('paroChart', {
          type: 'line',
          data: {
            labels: d.map(d => d.fecha),
            datasets: [{
              data: d.map(d => d.paro),
              borderColor: (this.datosParoFiltro[0].paro > this.datosParoFiltro[this.datosParoFiltro.length - 1].paro) ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
              backgroundColor: (this.datosParoFiltro[0].paro > this.datosParoFiltro[this.datosParoFiltro.length - 1].paro) ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
              fill: true,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Parados en ' + this.getProvinceName(this.province),
                font: {
                  size: 50
                }
              },
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }


          }
        });
      })
  }

  ngOnChanges(changes) {
    if (this.month1 != 0 && this.month2 != 0)
      this.datosParoFiltro = this.datosParo.filter(d => d.cod == this.province && ((+this.year1 == d.year && +this.month1 <= d.month) || +this.year1 < d.year) && ((+this.year2 == d.year && +this.month2 >= d.month) || +this.year2 > d.year) && (this.month1 != 0 && this.month2 != 0));
    else
      this.datosParoFiltro = this.datosParo.filter(d => d.cod == this.province);
    this.chart.data.labels = this.datosParoFiltro.map(d => d.fecha);
    this.chart.data.datasets[0].data = this.datosParoFiltro.map(d => d.paro);
    if (this.datosParoFiltro[0].paro > this.datosParoFiltro[this.datosParoFiltro.length - 1].paro) {
      this.chart.data.datasets[0].backgroundColor = 'rgba(0, 255, 0, 0.5)';
      this.chart.data.datasets[0].borderColor = 'rgba(0, 255, 0, 0.5)';
    }
    else {
      this.chart.data.datasets[0].backgroundColor = 'rgba(255, 0, 0, 0.5)';
      this.chart.data.datasets[0].borderColor = 'rgba(255, 0, 0, 0.5)';
    }
    this.chart.options.plugins.title.text = 'Parados en ' + this.getProvinceName(this.province);
    this.chart.update();
    this.chart.resize();
  }

  getProvinceName(province: string): string {
    return this.provinces.find(p => p.value == province).text;
  }




}
