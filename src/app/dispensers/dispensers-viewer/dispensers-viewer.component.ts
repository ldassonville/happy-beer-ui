import { Component, OnInit } from '@angular/core';
import { Dispenser } from '../dispenser';
import { DispenserService } from '../dispenser.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dispensers-viewer',
  templateUrl: './dispensers-viewer.component.html',
  styleUrls: ['./dispensers-viewer.component.scss']
})
export class DispensersViewerComponent implements OnInit {

  dispensers : Dispenser[] = []

  constructor(
    private dispenserService: DispenserService
  ) {}

  ngOnInit() {

    this.reload()

    
    const eventSource = new EventSource( `http://localhost:9000/dispensers/_all/events`);
    //eventSource.onmessage = m => alert(m)
    eventSource.addEventListener("CREATE", m => this.reload())
    eventSource.addEventListener("UPDATE", m => this.reload())
    eventSource.addEventListener("DELETE", m => this.reload())
    eventSource.addEventListener("UPDATE", m => this.reload())
    eventSource.addEventListener("ERROR", m => this.reload())


    let that = this
    eventSource.onerror = (e) => {
      //console.error(e);
      setTimeout(()=> { window.location.reload();}, 2000);
    }

  }
  
  reload(){
    this.dispenserService.getDispensers().subscribe( dispensers => {
      this.dispensers = dispensers;
    })

  }
}
