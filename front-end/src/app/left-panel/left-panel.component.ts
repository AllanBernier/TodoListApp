import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [ MatIcon],
  template: `
  <div class="h-full bg-stone-950 flex flex-col"   [class]="open ? 'w-64' : 'w-12'">>
      <button (click)="toggle()" class="p-1 m-1 rounded-md bg-red-900">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="menu_open"></mat-icon>
      </button>

      @for (tab of tabs; track $index) {
      <button class="p-1 m-1 rounded-md bg-stone-900 text-left flex gap-6">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="{{tab.icon}}"></mat-icon>
        @if (open) {
          <span class="text-white">{{tab.name}}</span>
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
`,
})
export class LeftPanelComponent {
  open = true;

  tabs= [
    {name: "Liste de courses", icon: "shopping_cart", id:1},
    {name: "Travail", icon: "restaurant", id:3 },
    {name: "Clients", icon: "menu_book", id:2},
  ]

  toggle() {
    console.log("clicked")
    this.open = !this.open;
  }







}
