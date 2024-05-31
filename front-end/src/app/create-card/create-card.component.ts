import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="w-full p-2  opacity-60 hover:opacity-90 bg-gray-800 text-white rounded-md flex cursor-pointer">
      <input [formControl]="taskName" autofocus class="w-full p-2 bg-gray-800 text-white placeholder-white" placeholder="+ Ajouter une tâche"  (blur)="submitTask()" (keydown.enter)="submitTask()" />
    </div>

  `
})
export class CreateCardComponent {
  onCreateTask = output<string>();
  taskName = new FormControl<string>('');

  submitTask() {
    if (this.taskName.value !== null && !(this.taskName.value === '')) {
      this.onCreateTask.emit(this.taskName.value);
      this.taskName.reset();
    }
  }


}
