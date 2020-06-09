import { Component } from '@angular/core';

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
    { prop: 'name', summaryFunc: () => null },
    { prop:'gender',name: '性别', summaryFunc: cells => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null },
  ];

  data = [
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
    {'name':'1','gender':'male', 'company':'test'},
  ]

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
    console.log(event);
  }

  fetch(cb) {
    // const req = new XMLHttpRequest();
    // req.open('GET', `assets/data/company.json`);
    //
    // req.onload = () => {
    //   cb(JSON.parse(req.response));
    // };
    cb(this.data)
    // req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }
}
