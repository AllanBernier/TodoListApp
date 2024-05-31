import { Component } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LeftPanelComponent],
  styles: [` 
  .all-screen{
    height: calc(100vh - 6rem)
  }
  `], 
  template: `
  <!-- Left panel should take all screen avaliable place -->
  <div class="flex w-full h-full">
    <app-left-panel ></app-left-panel>
    <div class="all-screen flex flex-col w-full h-full">
      Hello
    </div>

  </div>
  `,
})
export class DashboardComponent {

}
