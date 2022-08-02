import { Component, Input } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Grid } from 'ng2-smart-table/lib/lib/grid';



@Component({
  selector: '[ng2-st-checkbox-select-all]',
  template: `
    <input type="checkbox" (ngModel)="isAllSelected"  class="form-control" id="fertirrigacao" required="false" name="fertirrigacao" autocomplete="false">
      `
  ,
})
export class CheckboxSelectAllComponent {

  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() isAllSelected: boolean;
}
