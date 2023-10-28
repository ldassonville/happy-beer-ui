import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Observable } from 'rxjs';
import { Dispenser } from './dispenser';

@Injectable({
  providedIn: 'root'
})
export class DispenserService {

  constructor(private api: ApiService) { }

  getDispensers(): Observable<Dispenser[]> {

    var statusParam = "internalStatus=all"

    return this.api.getJson(
      `${this.api.url}/dispensers?${statusParam}`
    );
  }



  createEventSource(): Observable<Event> {
  

    const eventSource = new EventSource( `${this.api.url}/dispensers/_all/events`);

      eventSource.onerror = err => {
        console.log("err : "+err)
        console.log(err)
      }
      
      eventSource.onmessage = event => {
        console.log("mesg")
      }
    
      eventSource.onopen = event => {
        console.log("open")
      }

    return new Observable(observer => {
  
          
        //console.log("message")
        //const messageData: Event = JSON.parse(event.data);
          //observer.next(messageData);
      
    });


    
 }
}
