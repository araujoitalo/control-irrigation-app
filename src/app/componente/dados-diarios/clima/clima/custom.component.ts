import { Component } from '@angular/core';

@Component({
  selector: 'custom-component',
  template: ` <input
    [(ngModel)]="rowData.temperaturaMinima"
    (ngModelChange)="onModelChange()"
  />`,
})
export class CustomComponent {
  rowData: any;

  onModelChange() {
    this.rowData.temperaturaMedia =
      this.rowData.temperaturaMaxima + this.rowData.temperaturaMinima / 2;
    console.log(this.rowData.temperaturaMedia);
  }
}
