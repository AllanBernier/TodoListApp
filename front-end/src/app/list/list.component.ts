import { Component, Input, OnInit, input, output } from '@angular/core';
import { List } from '../../types/list';
import { MatIcon } from '@angular/material/icon';
import { AskModalComponent } from '../ask-modal/ask-modal.component';
import { CreateCardComponent } from '../create-card/create-card.component';
import { DragDropModule, CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DropEvent } from '../../types/DropEvent';
import { Card } from '../../types/card';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatIcon, AskModalComponent, CreateCardComponent, DragDropModule, CdkDrag, CdkDropList],
  styles: [` 
  .all-screen{
    height: calc(100vh - 8rem)
  }
.cdk-drag-preview {
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
              0 8px 10px 1px rgba(0, 0, 0, 0.14),
              0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.cdk-drag-placeholder {
  opacity: 0;
}
.cdk-drag-animating {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
.example-box:last-child {
  border: none;
}
.example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}
  `],
  template: `
    <div class="w-72 rounded-md all-screen bg-gray-800 text-white" (mouseover)="isHover=true" (mouseout)="isHover=false">
      <div class="w-full p-4 flex">
        <p class="text-white font-bold">{{list?.name}}</p>

        @if (isHover) {
          <div class="ml-auto">
            <mat-icon class="hover:bg-red-900 hover:rounded-md ml-auto" (click)="openDeleteModal()" aria-hidden="false" color="accent" aria-label="" fontIcon="delete"></mat-icon>
        </div>
        }

      </div>  


      <div 
        cdkDropList 
        [cdkDropListData]="list?.cards  " 
        (cdkDropListDropped)="drop($event)"
        class="h-full w-1 min-w-full overflow-y-scroll overflow-x-hidden scrollbar-none p-4">

      @for (card of list?.cards; track $index) {
          <div cdkDrag [cdkDragData]="card" class="bg-gray-900 p-2 m-2 rounded-md">
            <p class="text-white">{{card.name}}</p>
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
  onMoveItemInArray = output<DropEvent>()
  onChangeArray = output<DropEvent>()



  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     this.onMoveItemInArray.emit({previousIndex: event.previousIndex, currentIndex: event.currentIndex})    
  //   } else {

  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );  
  //   }
  // }

  drop(event: any) {
    console.log("Drop")
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("Hi")
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

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
