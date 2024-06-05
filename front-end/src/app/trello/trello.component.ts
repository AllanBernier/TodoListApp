import { Component, OnInit } from '@angular/core';
import { List } from '../../types/list';
import { ListComponent } from '../list/list.component';
import { AddListComponent } from '../add-list/add-list.component';
import { CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DropEvent } from '../../types/DropEvent';
import { TableauService } from '../../services/auth/tableau.services';
import { Tableau } from '../../types/tableau';
import { ListService } from '../../services/auth/list.service';
import { CardService } from '../../services/auth/card.service';


@Component({
  selector: 'app-trello',
  standalone: true,
  imports: [ListComponent, AddListComponent, CdkDropListGroup],
  template: `
  <div cdkDropListGroup class="h-full w-1 min-w-full overflow-x-scroll overflow-y-hidden flex gap-8 p-4 pb-8 bg-gray-900 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-300">
  
    @for (list of activeTab.lists; track list.id) {
      <app-list (onSwapCardList)="swapCardList($event)" (onSwapCardOrder)="swapCardOrder(list)" (onCreateTask)="createTask($event, list)" (onDeleteList)="deleteList(list.id)" [list]="list"></app-list>
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

  constructor(public tableauService: TableauService, public listService: ListService, public cardService : CardService) { }


  swapCardOrder(list : List) {
    this.cardService.saveListOrder(list.cards)
  }
  swapCardList(event: any) {
    if (this.activeTab.lists === undefined) return
    let findedList : List | undefined = undefined
    
    // Finds the list where the card was dropped
    for (let list of this.activeTab.lists) {
      for (let card of list.cards) {
        if (card.id === event.item.data.id) {
          findedList = list
          break
        }
        if (findedList !== undefined) {
          break
        }
      }
    }
   
    if (findedList === undefined) return
    if (findedList.cards === undefined) return

    this.cardService.swapCardList(event.item.data.id, findedList.id).then(() => {
      this.cardService.saveListOrder(findedList.cards)
    })
  }
  

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
  createTask(name: string, list: List) {
    if (list.cards === undefined) list.cards = []

    this.cardService.create(name, list.id, ).then((card) => {
      console.log(card)
      list.cards.push(card)
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

}
