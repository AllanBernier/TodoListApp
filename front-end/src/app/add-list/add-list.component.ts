import { Component, EventEmitter, Output, output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  template: `
    <div (click)="isClicked = true" class="w-72 p-2  opacity-60 hover:opacity-90 bg-gray-800 text-white rounded-md flex justify-center items-center cursor-pointer">
      @if (!isClicked) {
        + Ajouter une liste
      } @else {
        <input [formControl]="newListControl" autofocus class="w-full p-2 bg-gray-800 text-white" placeholder="Nom de la liste"  (blur)="isClicked=false" (keydown.enter)="enterPressed()" />
      }
    </div>
  `
})
export class AddListComponent {
  isClicked = false;
  newListControl = new FormControl<string>('');
  onCreateList = output<string>();
  
  enterPressed() {
    if (this.newListControl.value === '') {
      this.isClicked = false;
      return;
    }
    if (this.newListControl.value !== null) {
      this.onCreateList.emit(this.newListControl.value);
      this.newListControl.reset();
      this.isClicked = false;
    }
  }




}
