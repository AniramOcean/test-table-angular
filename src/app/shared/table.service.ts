import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  headers: string[] = ['id', 'name', 'surname', 'languages'];

  constructor() { }

}
