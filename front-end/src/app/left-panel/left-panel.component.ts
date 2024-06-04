import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AskModalComponent } from '../ask-modal/ask-modal.component';
import { Tableau } from '../../types/tableau';
import { NewTabModalComponent } from '../new-tab-modal/new-tab-modal.component';
import { TableauService } from '../../services/auth/tableau.services';
import { firstValueFrom, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [MatIcon, AskModalComponent, NewTabModalComponent],
  template: `
  <div class="h-full bg-stone-950 flex flex-col"   [class]="open ? 'w-64' : 'w-12'">
      <button (click)="toggle()" class="p-1 m-1 rounded-md bg-red-900">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="menu_open"></mat-icon>
      </button>

      @for (tab of tabs; track $index) {
      <button (click)="switchTab(tab)" class="p-1 m-1 rounded-md bg-stone-900 text-left flex gap-6 content-between" [class]="activeTab.id === tab.id ? 'bg-green-900' : ''" (mouseover)="delete_id=tab?.id || -1" (mouseout)="delete_id=-1">
        <mat-icon aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="{{tab.icon}}"></mat-icon>
        @if (open) {
          <span class="text-white">{{tab.name}}</span>
        }
        @if (delete_id == tab.id && open) {
          <mat-icon class="hover:bg-red-900 hover:rounded-md ml-auto" (click)="openDeleteModal()" aria-hidden="false" color="accent" aria-label="Example home icon" fontIcon="delete"></mat-icon>
        }

      </button>
      }
      <button class="p-1 m-1 rounded-md bg-green-950 text-left flex gap-6" (click)="newTabModal = true;">
        <mat-icon aria-hidden="false" color="warn" aria-label="Example home icon" fontIcon="add"></mat-icon>
        @if (open) {
          <span class="text-white">Nouveau tableau</span>
        }
      </button>
  </div>

  @if (deleteModal) {
    <app-ask-modal text="Voulez-vous vraiment supprimer ce tableau ?" (confirm)="delete()" (cancel)="deleteModal=false"></app-ask-modal>
  }
  @if (newTabModal) {
    <app-new-tab-modal (newTab)="newTab($event)" (close)="newTabModal = false;" ></app-new-tab-modal>
  }
  
`,
})
export class LeftPanelComponent implements OnInit {

  newTabModal = false;
  deleteModal = false;
  delete_id = -1;
  to_delete = -1;
  open = true;
  activeTab: Tableau = { id: 0, name: 'Default', icon: 'default' };
  tabs: Tableau[] = []

  constructor(public tableauService: TableauService) { }

  async ngOnInit() {
    const myrecievedtab = await this.tableauService.getTabs();
    this.tabs = myrecievedtab;
    if (this.tabs.length == 0) {
      this.newTabModal = true;
    } else {
      this.activeTab = this.tabs[0];
      this.tableauService.activeTabSubject.next(this.tabs[0]);
    }
  }

  newTab(tab: Tableau) {
    this.newTabModal = false;
    this.tableauService.createTab(tab).then((tab) => this.tabs.push(tab))
  }

  switchTab(tab: Tableau) {
    this.activeTab = tab;
    this.tableauService.activeTabSubject.next(tab);
  }

  openDeleteModal() {
    this.to_delete = this.delete_id
    this.deleteModal = true;
  }

  delete() {
    this.deleteModal = false;
    this.tableauService.deleteTab(this.to_delete).then( (deleted) => this.tabs = this.tabs.filter(tab => tab.id != this.to_delete))
  }

  toggle() {
    console.log("clicked")
    this.open = !this.open;
  }
}
