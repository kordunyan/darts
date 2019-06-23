import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ArrayUtils } from 'src/app/shared/utils/array.utils';

@Component({
  selector: 'app-player-name-dialog',
  templateUrl: './player-name-dialog.component.html',
  styleUrls: ['./player-name-dialog.component.css']
})
export class PlayerNameDialogComponent {
  myControl = new FormControl();
  availableNames: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<PlayerNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.setAvailablenames(data.availableNames);    
    this.initNamesFilter();
  }

  setAvailablenames(names: string[]) {
    this.availableNames = names;
    ArrayUtils.sort(this.availableNames, v => v);
  }

  initNamesFilter() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  onCancel() {
    this.dialogRef.close();  
  }

  onAdd() {
    const name = this.myControl.value;
    if (name && name.trim().length) {
      this.dialogRef.close(name.trim());
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableNames.filter(option => option.toLowerCase().includes(filterValue));
  }
}
