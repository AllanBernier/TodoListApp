import { Injectable } from "@angular/core";
import { Tableau } from "../../types/tableau";
import { AuthService } from "./auth.service";
import { firstValueFrom } from "rxjs";
import { List } from "../../types/list";
import { Card } from "../../types/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public authService: AuthService) { }
    
  create(name: string, listId: number) : Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/card/${listId}`, "POST", { name: name }))
  }

  delete(id : number): Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/card/${id}`, "DELETE"))
  }

  saveListOrder(cards : Card[]): Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/card/order`, "PUT", { cards: cards}))
  }

  swapCardList(cardId : number, listId : number): Promise<List>{
    return firstValueFrom( this.authService.fetchWithHeader<List>(`/card/swaplist/${cardId}/${listId}`, "PUT"))
  }
}