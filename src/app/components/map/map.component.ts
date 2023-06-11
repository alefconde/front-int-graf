import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import Globe from 'globe.gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() widthMap: number = 800;
  @Input() heightMap: number = 600;

  globe = Globe();

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));
    this.globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color').width(this.widthMap).height(this.heightMap)
    (document.getElementById('globeViz'))
  }
  ngOnChanges(changes: SimpleChanges) {
    this.globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg').width(this.widthMap).height(this.heightMap)
    (document.getElementById('globeViz'))
    console.log(this.widthMap)
  }


}
