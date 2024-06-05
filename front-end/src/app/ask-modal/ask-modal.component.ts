import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ask-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="fixed top-0 z-10 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-4 rounded-md">
        <h1 class="text-xl font-bold">{{text}}</h1>
        <div class="flex gap-4 mt-4">
          <button class="bg-red-500 w-1/2 text-white px-4 py-2 rounded-md" (click)="confirmAction()">Yes</button>
          <button class="bg-green-500 w-1/2 text-white px-4 py-2 rounded-md" (click)="cancelAction()">No</button>
        </div>
      </div>
    </div>
  `

})
export class AskModalComponent {

  @Input() text: string = '';
  @Output("confirm") confirm = new EventEmitter();
  @Output("cancel") cancel = new EventEmitter();
  
  confirmAction() {
    this.confirm.emit();
  }
  
  cancelAction() {
    this.cancel.emit();
  }
    


}
