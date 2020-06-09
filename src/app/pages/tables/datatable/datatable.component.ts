import { Component } from '@angular/core';
import {Http2ServerRequest} from "http2";

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent {
  rows = [];
  loadingIndicator = true;
  page = {
    total: 0,
    page: 0,
    limit: 10,
  };
  columns = [
    { prop: 'id', summaryFunc: () => null },
    { prop:'name',name: '名称', summaryFunc: cells => this.summaryForGender(cells) },
    { prop: 'code', name:'编码', summaryFunc: () => null },
  ];

  constructor() {
    this.page.page = 0;
    this.page.limit = 10;
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  setPage(event) {
    this.page.page = event.offset+1
    this.fetch(data => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('get', `http://localhost:2333/org/query?`+'page='+this.page.page+"&limit="+this.page.limit);

    req.onload = () => {
      console.log(JSON.parse(req.response).data.list)
      cb(JSON.parse(req.response).data.list);
      this.page.total = JSON.parse(req.response).data.total
    };
    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }
}
