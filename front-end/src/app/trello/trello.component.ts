import { Component } from '@angular/core';
import { List } from '../../types/list';
import { ListComponent } from '../list/list.component';
import { AddListComponent } from '../add-list/add-list.component';

@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [ListComponent, AddListComponent],
  template: `
  <div class="h-full w-1 min-w-full overflow-x-scroll overflow-y-hidden flex gap-8 p-4 pb-8 bg-gray-900 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300">
  
    @for (list of lists; track $index) {
      <app-list (onCreateTask)="createTask($event, list)" (onDeleteList)="deleteList(list.id)" [list]="list"></app-list>
    }
    <app-add-list (onCreateList)="addList($event)"></app-add-list>
  </div>
  `
})
export class TrelloComponent {

  createTask( name: string, list: List) {
    list.cards.push({
      title: name,
      id: list.cards.length + 1,
      description: '',
    })
  }

  addList(title: string) {
    this.lists.push({
      title: title,
      id: this.lists.length + 1,
      cards: []
    })
  }

  deleteList(id: number) {
    this.lists = this.lists.filter(list => list.id != id)
  }



  lists: List[]= [
    {
      id: 0,
      title: 'Upcomming',
      cards: [
        {
          id : 1,
          title: 'Card 1',
          description: 'Description 1',
        },
        {
          id : 1,
          title: 'Card 2',
          description: 'Description 2',
        }
      ]
    },
    {
      title: 'In Progress',
      id : 1,
      cards: [
        {
          id : 1,
          title: 'Card 3',
          description: 'Description 3',
        },
        {
          title: 'Card 4',
          id : 1,
          description: 'Description 4',
        }
      ]
    },
    {
      title: 'Done',
      id : 2,
      cards: [
        {
          title: 'Card 5',
          description: 'Description 5',
          id : 1,
        },
        {
          id : 1,
          title: 'Card 6',
          description: 'Description 6',
        }
      ]
    },
    {
      title: 'Done',
      id : 3,
      cards: [
        {
          title: 'Card 5',
          description: 'Description 5',
          id : 1,
        },
        {
          id : 1,
          title: 'Card 6',
          description: 'Description 6',
        },
        {
          id : 1,
          title: 'Card 6',
          description: 'Description 6',
        },
        {
          id : 1,
          title: 'Card 6',
          description: 'Description 6',
        },
      ]
    } 
  ]
}