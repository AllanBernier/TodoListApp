import { Component, OnInit } from '@angular/core';
import { List } from '../../types/list';
import { ListComponent } from '../list/list.component';
import { AddListComponent } from '../add-list/add-list.component';
import { CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DropEvent } from '../../types/DropEvent';
import { TableauService } from '../../services/auth/tableau.services';
import { Tableau } from '../../types/tableau';
import { ListService } from '../../services/auth/list.service';


@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [ListComponent, AddListComponent, CdkDropListGroup],
  template: `
  <div cdkDropListGroup class="h-full w-1 min-w-full overflow-x-scroll overflow-y-hidden flex gap-8 p-4 pb-8 bg-gray-900 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300">
  
    @for (list of activeTab.lists; track list.id) {
      <app-list (onChangeArray)="switchArray($event)" (onMoveItemInArray)="moveItemInArray($event, list)" (onCreateTask)="createTask($event, list)" (onDeleteList)="deleteList(list.id)" [list]="list"></app-list>
    }
    <app-add-list (onCreateList)="addList($event)"></app-add-list>
  </div>
  `
})
export class TrelloComponent implements OnInit {

  activeTab: Tableau = {
    id: 0,
    name: 'Default',
    icon: 'default',
  }

  constructor(public tableauService: TableauService, public listService: ListService) { }

  ngOnInit() {
    this.tableauService.activeTabSubject.subscribe(tab => {
      // get tab by id
      if (tab.id !== undefined) {
        this.tableauService.getTab(tab.id).subscribe(tab => {
          this.activeTab = tab
          console.log("Tab changed")
        }, error => {
          console.log("Error while getting tab")
        })
      }
    })
  }
  moveItemInArray(event: DropEvent, list: List) {
    moveItemInArray(list.cards, event.previousIndex, event.currentIndex);
  }

  switchArray(event: DropEvent) {
    if (event.previousContainer !== undefined && event.container !== undefined && event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  createTask(name: string, list: List) {
    list.cards.push({
      name: name,
      id: Math.random(),
    })
  }

  addList(name: string) {
    if (this.activeTab === undefined) return
    if (this.activeTab.id === undefined) return

    this.listService.createList(this.activeTab.id, name).then((list) => {
      if (this.activeTab.lists !== undefined) {
        this.activeTab.lists.push(list)
      }
      console.log("Hi")
    })
  }

  deleteList(id: number) {

    this.listService.deleteList(id).then((list) => {
      if (this.activeTab.lists !== undefined) {
        this.activeTab.lists = this.activeTab.lists.filter(list => list.id != id)
      }
    })
  }



  lists: List[] = [
    {
      id: 0,
      name: 'Upcomming',
      cards: [
        {
          id: 1,
          name: 'Card 1',
        },
        {
          id: 1,
          name: 'Card 2',
        }
      ]
    },
    {
      name: 'In Progress',
      id: 1,
      cards: [
        {
          id: 1,
          name: 'Card 3',
        },
        {
          name: 'Card 4',
          id: 1,
        }
      ]
    },
    {
      name: 'Done',
      id: 2,
      cards: [
        {
          name: 'Card 5',
          id: 1,
        },
        {
          id: 1,
          name: 'Card 6',
        }
      ]
    },
    {
      name: 'Done',
      id: 3,
      cards: [
        {
          name: 'Card 5',
          id: 1,
        },
        {
          id: 1,
          name: 'Card 6',
        },
        {
          id: 1,
          name: 'Card 6',
        },
        {
          id: 1,
          name: 'Card 6',
        },
      ]
    }
  ]
}
