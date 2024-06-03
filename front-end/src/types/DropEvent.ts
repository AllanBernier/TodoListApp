import { CdkDropList } from "@angular/cdk/drag-drop"

export type DropEvent = {
  previousIndex : number,
  currentIndex: number, 
  previousContainer ?: CdkDropList<string[]>, 
  container ?: CdkDropList<string[]> 
}