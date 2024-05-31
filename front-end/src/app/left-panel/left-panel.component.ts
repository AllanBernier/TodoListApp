import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AskModalComponent } from '../ask-modal/ask-modal.component';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [ MatIcon, AskModalComponent ],
  template: `
  <div class="h-full bg-stone-950 flex flex-col"   [class]="open ? 'w-64' : 'w-12'">>
      <button (click)="toggle()" class="p-1 m-1 rounded-md bg-red-900">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="menu_open"></mat-icon>
      </button>

      @for (tab of tabs; track $index) {
      <button class="p-1 m-1 rounded-md bg-stone-900 text-left flex gap-6 content-between" (mouseover)="delete_id=tab.id" (mouseout)="delete_id=-1">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="{{tab.icon}}"></mat-icon>
        @if (open) {
          <span class="text-white">{{tab.name}}</span>
        }
        @if (delete_id == tab.id && open) {
          <mat-icon class="hover:bg-red-900 hover:rounded-md ml-auto" (click)="openDeleteModal()" aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="delete"></mat-icon>
        }

      </button>
      }
      <button class="p-1 m-1 rounded-md bg-green-950 text-left flex gap-6">
        <mat-icon aria-hidden="false" color="warn" aria-label="Example home icon" fontIcon="add"></mat-icon>
        @if (open) {
          <span class="text-white">Nouveau tableau</span>
        }
      </button>
  </div>

  @if (deleteModal) {
    <app-ask-modal text="Voulez-vous vraiment supprimer ce tableau ?" (confirm)="delete()" (cancel)="deleteModal=false"></app-ask-modal>
  }
`,
})
export class LeftPanelComponent {
  open = true;
  delete_id = -1;
  to_delete = -1;
  deleteModal = false;

  tabs= [
    {name: "Liste de courses", icon: "shopping_cart", id:1},
    {name: "Travail", icon: "restaurant", id:3 },
    {name: "Clients", icon: "menu_book", id:2},
  ]

  openDeleteModal(){
    this.to_delete = this.delete_id
    this.deleteModal = true;
  }

  delete() {
    this.tabs = this.tabs.filter(tab => tab.id != this.to_delete)
    this.deleteModal = false;
  }
  
  toggle() {
    console.log("clicked")
    this.open = !this.open;
  }



}
