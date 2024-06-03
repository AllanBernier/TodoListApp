import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-tab-modal',
  standalone: true,
  imports: [ ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIcon],
  template : `
    <div class="fixed z-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-4 rounded-md">
        <mat-form-field class="example-full-width">
          <mat-label>Nom du tableau</mat-label>
          <input [formControl]="tableName" matInput placeholder="Ex. Courses" value="Sushi">
        </mat-form-field>

        <div class="w-full h-full p-4 grid gap-4 grid-cols-4">
          @for (icon of icons; track icon) {
            
            <mat-icon class="hover:bg-slate-500 rounded-md m-2" (click)="selectedIcon = icon" [class]="icon === selectedIcon ? 'bg-red-500' : ''" aria-hidden="false" aria-label="Example home icon" [fontIcon]="icon"></mat-icon>
            
          }
        </div>

        @if(error){
          <p class="text-red-500">{{error}}</p>
        }

        <div class="flex gap-4 mt-4">
          <button class="bg-green-500 w-1/2 text-white px-4 py-2 rounded-md" (click)="confirmAction()">Yes</button>
          <button class="bg-red-500 w-1/2 text-white px-4 py-2 rounded-md" (click)="cancelAction()">No</button>
        </div>
      </div>
    </div>
  `
})
export class NewTabModalComponent {
  selectedIcon = ""
  tableName = new FormControl<string>('');
  error = ""
  @Output("close") close = new EventEmitter();
  @Output("newTab") newTab = new EventEmitter<{icon : string, name: string}>();

  icons = [ "shopping_cart", "home", "work", "analytics", "book", "restaurant", "build", "bookmarks", "account_circle", "menu_book", "movies", "calendar_today"  ]


  confirmAction(){
    if (this.selectedIcon === "" || this.tableName.value == null || this.tableName.value?.length === 0){
      this.error = "Remplissez le formulaire !"
      return
    }

    this.newTab.emit({icon : this.selectedIcon, name: this.tableName.value})
  }
  cancelAction(){
    this.close.emit();
  }
}
