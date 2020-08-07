// import {Component, OnInit, ViewChild} from '@angular/core';
// import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
// import {MatTable} from '@angular/material/table';
//
//
// const headers: string[] = ['id', 'name', 'surname', 'languages'];
// const values: any[] = [
//     {
//       id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
//       name: 'John',
//       surname: 'Grey',
//       languages: ['Typescript', 'Java', 'Clojure'],
//     },
//     {
//       id: '75442486-0878-440c-9db1-a7006c25a39f',
//       name: 'Ella',
//       surname: 'Piterson',
//       languages: ['Delphi', 'VB', 'C++'],
//     },
//     {
//       id: '111111-e0b8-42e0-8dcf-dc8c4aefc000',
//       name: 'Bob',
//       surname: 'Johnson',
//       languages: ['C++', 'C#', 'Python'],
//     }
//   ];
//
//
// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.scss']
// })
//
// export class TableComponent implements OnInit {
//   @ViewChild('table') table: MatTable<any>;
//
//   displayedColumns: string[] = headers;
//   columnsToDisplay: string[] = this.displayedColumns.slice();
//   dataSource: any[] = values;
//
//   constructor() {
//   }
//
//   ngOnInit(): void {
//   }
//
//   drop(event: CdkDragDrop<string[]>): any {
//     moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
//     this.table.renderRows();
//   }
//
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {TableService} from '../shared/table.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  @ViewChild('table') table: MatTable<any>;

  displayedColumns: string[] = this.tableService.headers;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  csvData: any[] = [];

  constructor(
    private tableService: TableService,
    private ngxCsvParser: NgxCsvParser,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): any {
    moveItemInArray(this.csvData, event.previousIndex, event.currentIndex);
    this.table.renderRows();
  }

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ';' })
      .pipe().subscribe((result: any[]) => {

        console.log('Result', result);
        this.csvData = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  onDeleteData(id: number) {
    this.csvData = this.csvData.filter(data => data.id !== id);
  }


  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {
        csvData: this.csvData[id],
        headers: this.columnsToDisplay,
      }});

    dialogRef.afterClosed().subscribe(res => console.log(res));
  }

}


