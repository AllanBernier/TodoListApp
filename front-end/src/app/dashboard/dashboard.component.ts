import { Component } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { TrelloComponent } from '../trello/trello.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftPanelComponent, TrelloComponent],
  styles: [` 
  .all-screen{
    height: calc(100vh - 6rem)
  }
  `], 
  template: `
  <!-- Left panel should take all screen avaliable place -->
  <div class="flex w-full h-full">
    <app-left-panel ></app-left-panel>
    <div class="all-screen flex flex-col w-full">
      <app-trello class="w-full h-full"></app-trello>
    </div>

  </div>
  `,
})
export class DashboardComponent {

}
