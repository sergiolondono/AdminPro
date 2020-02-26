import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input('chartLabels') doughnutChartLabels: string[] = [];
  @Input('chartData') doughnutChartData: MultiDataSet = [  ];
  @Input('chartType') doughnutChartType: string  = '';

  constructor() { }

  ngOnInit(): void {
  }

}
