import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  headers: string[] = ['id', 'name', 'surname', 'languages'];
  public csvData: any[] = [];

  get tableHeaders(): string[] {
    return this.headers.slice();
  }

  get tableCsvData(): any[] {
    return this.csvData;
  }

  setCsvData(csv: any[]) {
    this.csvData = csv;
  }

  setCsvItem(csvItem: any, index: number) {
    this.csvData[index] = csvItem;
  }

  deleteCsvDataById(id: number) {
    this.csvData = this.csvData.filter(csv => csv.id !== id);
  }
}
