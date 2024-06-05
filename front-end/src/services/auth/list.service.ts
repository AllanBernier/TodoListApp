import { Injectable } from "@angular/core";
import { Tableau } from "../../types/tableau";
import { AuthService } from "./auth.service";
import { firstValueFrom } from "rxjs";
import { List } from "../../types/list";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(public authService: AuthService) { }
    

  createList(tableauId : number, name : string) : Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/list/${tableauId}`, "POST", { name: name }))
  }

  deleteList(id : number): Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/list/${id}`, "DELETE"))
  }
}