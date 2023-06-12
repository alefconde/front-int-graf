import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Tools } from 'src/app/tools/tools';
import yearsData from '../../../assets/years.json';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input() selected: { year1: number, month1: number, year2: number, month2: number };

  yearsData = yearsData;
  years: {text: string, value: number, months: {text: string, value: number}[]}[] = [];
  months1 = [{ text: "-", value: 0 }];
  months2 = [{ text: "-", value: 0 }];

  @Input() province: string = "07";

  provinces = [
    {text: "Toda la CCAA", value: "07"},
    {text: "Ávila", value: "05"},
    {text: "Burgos", value: "09"},
    {text: "León", value: "24"},
    {text: "Palencia", value: "34"},
    {text: "Salamanca", value: "37"},
    {text: "Segovia", value: "40"},
    {text: "Soria", value: "42"},
    {text: "Valladolid", value: "47"},
    {text: "Zamora", value: "49"}
  ]

  @Output() monthChangeControls = new EventEmitter<{ year: number, month: number, date2: boolean }>();
  @Output() provinceChangeControls = new EventEmitter<{province: string}>();

  constructor() { }

  ngOnInit(): void {
    this.years.push({ text: "-", value: 0, months: [{ text: "-", value: 0 }] });
    this.yearsData.forEach(year => {
      let months = [{ text: "-", value: 0 }]
      year.months.forEach(month => {
        months.push({ text: Tools.transformMonth(month.month), value: month.month });
      });

      this.years.push({ text: year.year.toString(), value: year.year, months: months });
    });

  }

  onSelectedYear1(event: any): void {

    let monthFound = false;
    if (event.target.value != 0)
      this.years.forEach(year => {
        if (year.value == event.target.value) {
          year.months.forEach((month: {text: string, value: number}) => {
            if (month.value == this.selected.month1) {
              monthFound = true;
              this.monthChangeControls.emit({ year: event.target.value, month: this.selected.month1, date2: false });
            }
          });
        }
      });
    if (!monthFound) {
      this.selected.month1 = 0;
      this.monthChangeControls.emit({ year: event.target.value, month: 0, date2: false });
    }
  }

  onSelectedYear2(event: any): void {
    let monthFound = false;
    if (event.target.value != 0)
      this.years.forEach(year => {
        if (year.value == event.target.value) {
          year.months.forEach((month: {text: string, value: number}) => {
            if (month.value == this.selected.month2) {
              monthFound = true;
              this.monthChangeControls.emit({ year: event.target.value, month: this.selected.month2, date2: true });
            }
          });
        }
      });
    if (!monthFound) {
      this.selected.month2 = 0;
      this.monthChangeControls.emit({ year: event.target.value, month: 0, date2: true });
    }
  }

  onSelectedMonth1(event: any): void {
    this.monthChangeControls.emit({ year: this.selected.year1, month: event.target.value, date2: false });
  }

  onSelectedMonth2(event: any): void {
    this.monthChangeControls.emit({ year: this.selected.year2, month: event.target.value, date2: true });
  }

  findYear1Months(years: {text: string, value: number, months: {text: string, value: number}[]}[]): {text: string, value: number}[] {
    return years.filter(year => year.value == this.selected.year1)[0].months;
  }

  findYear2Months(years: {text: string, value: number, months: {text: string, value: number}[]}[]): {text: string, value: number}[] {
    return years.filter(year => year.value == this.selected.year2)[0].months;
  }

  onSelectedProvince(event: any): void {
    this.province = event.target.value;
    this.provinceChangeControls.emit({ province: this.province});
  }


}
