import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  data = [
    { salesperson: 'Bob', sales: 33 },
    { salesperson: 'Robin', sales: 12 },
    { salesperson: 'Anne', sales: 41 },
    { salesperson: 'Mark', sales: 16 },
    { salesperson: 'Joe', sales: 39 }
  ];

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.generateBarChart();
  }

  generateBarChart() {
    // set the dimensions and margins of the graph
    const margin = { top: 5, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // create svg

    const svg = d3.select(this.element.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', '#efefef');

    // plot area

    const chart = svg.append('g')
      .attr('class', 'bar')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xDomain = this.data.map(d => d.salesperson);
    const yDomain = [0, d3.max(this.data, d => d.sales)];

    // set the scale for data domain
    const x = d3.scaleBand()
      .domain(xDomain)
      .rangeRound([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height, 0]);

    // add the x Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));

    // plot chart with data
    svg.selectAll('bar')
      .data(this.data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function (d) { return margin.left + x(d.salesperson); })
      .attr('width', x.bandwidth)
      .attr('y', function (d) { return y(d.sales); })
      .attr('height', function (d) { return height - y(d.sales); });
  }
}
