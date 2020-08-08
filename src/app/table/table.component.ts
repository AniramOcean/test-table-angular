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

  get headers(): string[] {
    return this.tableService.tableHeaders;
  }

  get csvData(): any[] {
    return this.tableService.tableCsvData;
  }

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

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;

    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ';' })
      .pipe().subscribe((result: any[]) => {

        console.log('Result', result);
        this.tableService.setCsvData(result);
    }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  onDeleteData(id: number) {
    this.tableService.deleteCsvDataById(id);
    this.table.renderRows();
  }


  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {data: {
        csvData: this.csvData[id],
        headers: this.headers,
        onSaveCallback: this.onSaveCallback,
        index: id
      }});

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.table.renderRows();
      }
    });
  }

  onSaveCallback = (csvItem: any, index: number) => {
    this.csvData[index] = csvItem;
  }
}




