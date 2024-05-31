import { Component, Input, input, output } from '@angular/core';
import { List } from '../../types/list';
import { MatIcon } from '@angular/material/icon';
import { AskModalComponent } from '../ask-modal/ask-modal.component';
import { CreateCardComponent } from '../create-card/create-card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatIcon, AskModalComponent, CreateCardComponent],
  styles: [` 
  .all-screen{
    height: calc(100vh - 8rem)
  }
  `],
  template: `
    <div class="w-72 rounded-md all-screen bg-gray-800 text-white" (mouseover)="isHover=true" (mouseout)="isHover=false">
      <div class="w-full p-4 flex">
        <p class="text-white font-bold">{{list?.title}}</p>

        @if (isHover) {
          <div class="ml-auto">
            <mat-icon class="hover:bg-red-900 hover:rounded-md ml-auto" (click)="openDeleteModal()" aria-hidden="false" color="accent" aria-label="" fontIcon="delete"></mat-icon>
        </div>
        }

      </div>  


      <div class="h-full w-1 min-w-full overflow-y-scroll overflow-x-hidden scrollbar-none p-4">

      @for (card of list?.cards; track $index) {
          <div class="bg-gray-900 p-2 m-2 rounded-md">
            <p class="text-white">{{card.title}}</p>
          </div>
        }
        <app-create-card (onCreateTask)="onCreateTask.emit($event)"></app-create-card>

        <div class="h-96"></div>

      </div>

    </div>
    @if (deleteModal) {
      <app-ask-modal text="Voulez-vous vraiment supprimer ce tableau ?" (confirm)="deleteConfirm()" (cancel)="deleteModal=false"></app-ask-modal>
    }
  `
})
export class ListComponent {
  @Input() list: List | undefined;
  onDeleteList = output();
  onCreateTask = output<string>()
  


  isHover = false;
  deleteModal = false;

  openDeleteModal() {
    this.deleteModal = true;
  }

  deleteConfirm() {
    this.deleteModal = false;
    this.onDeleteList.emit();
  }

  createTask(name: string) {
    console.log(name)
  }

}
