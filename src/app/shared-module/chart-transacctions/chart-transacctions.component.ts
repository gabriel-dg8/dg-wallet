import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiEthvmService } from 'src/app/services/apiethvm.service';
import { Web3Service } from 'src/app/services/web3.service';
import * as d3 from "d3";
import { Chart } from 'src/app/models/Chart';

@Component({
  selector: 'app-chart-transacctions',
  templateUrl: './chart-transacctions.component.html',
  styleUrls: ['./chart-transacctions.component.scss']
})
export class ChartTransacctionsComponent implements OnInit, AfterViewInit {

  constructor(private api: ApiEthvmService, private serv_web3: Web3Service) { }


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.getAverage();

  }

  async getAverage() {
    let data: Chart[] = [];
    let d = await this.api.getAverage();
    for (let i = 0; i < d.length; i++) {
      data.push({
        x: this.serv_web3.timestamp(d[i].timestamp),
        y: this.serv_web3.web3.utils.hexToNumber(d[i].value)
      });
    }

    var margin = { top: 10, right: 40, bottom: 30, left: 30 };
    let width = document.getElementById('padre').offsetWidth - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
    const svg = d3.select('#visualisation')
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.x; }))
      .range([0, width]);

    svg.append('g').attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));


    var y = d3.scaleLinear().domain([0, 300]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f35111")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.x) })
        .y(function (d) { return y(d.y) }));
  }

}


