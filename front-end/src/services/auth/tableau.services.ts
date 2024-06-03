import { Injectable } from "@angular/core";
import { Tableau } from "../../types/tableau";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TableauService {
  
  constructor(public authService: AuthService) { }
    
  getTabs() : void {
    this.authService.fetchWithHeader("/tableaux", "GET").subscribe({
      next: (response) => {
        console.log(response);
        return response;
      },
      error: (error) => {
        return console.error('There was an error!', error);
      }
    })

  }

  createTab(tableau : Tableau){

  }

  deleteTab(tableau : Tableau) {

  }

}