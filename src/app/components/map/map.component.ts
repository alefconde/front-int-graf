import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import Globe from 'globe.gl';
import * as d3 from 'd3';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() widthMap: number = 1920;
  @Input() heightMap: number = 600;
  @Input() year1: number = 0;
  @Input() month1: number = 0;
  @Input() year2: number = 0;
  @Input() month2: number = 0;
  @Input() province: string = "07";

  @Output() provinceChange = new EventEmitter<{ province: string }>();

  globe = Globe();

  datosParo = [];
  datosParo1 = [];
  datosParo2 = [];

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.globe = Globe()
      .globeImageUrl('../../../assets/8k_earth_daymap.jpg')
      .width(this.widthMap)
      .height(this.heightMap)
      .backgroundColor("#FFFFFF")
      .pointAltitude((d: any) => d.paro * 0.000001)
      .pointRadius(0.05)
      .pointColor('color')
      .pointLabel((d: any) => `<p>${d.fechaText}</p><p>${d.paro.toLocaleString("de-DE")} parados</p>`) //El formato alemán no me da tantos problemas con los números
    (document.getElementById('globeViz'))

    fetch('../../../assets/provincias.geojson').then(res => res.text()).then(regions => {
      this.globe.polygonsData(JSON.parse(regions).features)
        .polygonAltitude(() => 0)
        .polygonCapColor((d: any) => d.properties.codigo == this.province? 'rgba(80, 0, 0, 0.2)' : 'rgba(0, 100, 0, 0.2)')
        .polygonStrokeColor(() => '#111')
        .polygonLabel((d: any)=> `<b>${d.properties.texto}</b>`)
        .onPolygonClick((polygon: any) => {this.province == polygon.properties.codigo? this.province = "07" : this.province = polygon.properties.codigo; this.provinceChange.emit({province: this.province}); this.globe.polygonCapColor((d: any) => d.properties.codigo == this.province? 'rgba(80, 0, 0, 0.2)' : 'rgba(0, 100, 0, 0.2)')})
        .pointOfView({ lat: 41.40, lng: -4.25, altitude: 0.2}, 5000)
    })

    fetch('.../../../assets/paro.csv').then(res => res.text())
    .then(csv => d3.csvParse(csv, ({fecha,cod,prov,lng,lat,paro}) => ({ fecha: fecha, cod: cod, prov: prov, lng: +lng, lat: +lat, paro: +paro })))
    .then(data => this.datosParo = data);

  }
  ngOnChanges(changes: SimpleChanges) {
    this.globe.width(this.widthMap).height(this.heightMap)
    if ((changes.year1 && changes.year1.currentValue != changes.year1.previousValue) || changes.month1 && changes.month1.currentValue != changes.month1.previousValue) {
      this.datosParo1 = this.datosParo.filter(dato => dato.fecha == (this.year1.toString() + "-" + this.month1.toString())).filter(dato => dato.cod != "07")
      .map(dato => {dato.fechaText = this.numberToMonth(this.month1) + " " + this.year1.toString(); dato.lng = dato.lng - 0.1; dato.color = "blue"; return dato});
    }
    if ((changes.year2 && changes.year2.currentValue != changes.year2.previousValue) || changes.month2 && changes.month2.currentValue != changes.month2.previousValue) {
      this.datosParo2 = this.datosParo.filter(dato => dato.fecha == (this.year2.toString() + "-" + this.month2.toString())).filter(dato => dato.cod != "07")
      .map(dato => {dato.fechaText = this.numberToMonth(this.month2) + " " + this.year2.toString(); dato.lng = dato.lng + 0.1; dato.color = "red"; return dato});
    }
    this.globe.pointsData([...this.datosParo1, ...this.datosParo2]);
    if (changes.province && changes.province.currentValue != changes.province.previousValue) {
      this.globe.polygonCapColor((d: any) => d.properties.codigo == this.province? 'rgba(80, 0, 0, 0.2)' : 'rgba(0, 100, 0, 0.2)')
    }


  }

  numberToMonth(num: number): string {
    switch (num) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
        return "";
    }
  }


}