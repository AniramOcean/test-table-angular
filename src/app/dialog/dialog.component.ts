import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

// export interface csvData {
//   id?: string;
//   name: string;
//   surname: string;
//   languages: string;
// }

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  csvData: any[] = [];
  headers: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public options: any) {
    this.csvData.push(options.csvData);
    this.headers = options.headers;
    console.log('options:', this.options);
  }

  ngOnInit(): void {
  }

}
