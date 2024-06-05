import { Injectable } from "@angular/core";
import { Tableau } from "../../types/tableau";
import { AuthService } from "./auth.service";
import { Subject, firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableauService {
  
  activeTabSubject = new Subject<Tableau>()

  constructor(public authService: AuthService) { }
    

  getTabs() : Promise<Tableau[]>{
    return firstValueFrom( this.authService.fetchWithHeader<Tableau[]>("/tableaux", "GET"))
  }

  createTab(tableau : Tableau) : Promise<Tableau> {
    return firstValueFrom(this.authService.fetchWithHeader<Tableau>("/tableaux", "POST", tableau))
  }

  deleteTab(id : number){ 
    return firstValueFrom(this.authService.fetchWithHeader<Tableau>(`/tableaux/${id}`, "DELETE")) 
  }

  getTab(id : number){
    return this.authService.fetchWithHeader<Tableau>(`/tableaux/${id}`, "GET")
  }
}