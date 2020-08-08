import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TableService} from '../shared/table.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  csvData: any = {};
  headers: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public options: any,
    private tableService: TableService,
    private dialog: MatDialogRef<DialogComponent>) {
    this.csvData = Object.assign({}, this.options.csvData);
    this.headers = options.headers;
    console.log('options:', this.options);
  }

  ngOnInit(): void {
  }

  onSaveClicked() {
    this.tableService.setCsvItem(this.csvData, this.options.index);
    this.dialog.close(true);
  }
}
