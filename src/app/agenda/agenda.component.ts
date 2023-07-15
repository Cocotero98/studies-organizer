import { Component, OnInit } from '@angular/core';
import { MOCKSDAYS } from './MOCKDAYS';
import { AgendaService } from './agenda.service';
import { Day } from './day/day.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  week!:Day[];

  constructor(private agendaService:AgendaService){}

  ngOnInit(): void {
    
    this.week = this.agendaService.getAllDays()
    this.agendaService.allDaysChangedEvent.subscribe((days:Day[])=>{
      this.week = days
    })
  }
}
