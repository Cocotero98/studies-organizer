import { Component, OnInit } from '@angular/core';
import { Study } from './study.model';
import { MOCKSTUDY } from './MOCKSTUDY';
import { StudyService } from './study.service';
import { AgendaService } from '../agenda/agenda.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit{
  studies!:Study[];
  today!:string;
  totalTime= 0;

  constructor(private route:ActivatedRoute,
              private agendaService:AgendaService
    ){}

  ngOnInit(): void {
    this.today = this.agendaService.getCurrentDay();
    this.route.params.subscribe(
      (params:Params)=>{
        let day = params['day'];
        if(!day){
          return
        }
          this.today= day
      }
  )
    this.studies =this.agendaService.getStudiesPerDay(this.today)
    for(let study of this.studies){
      console.log(study.time)
      this.totalTime = this.totalTime + parseInt(study.time)
    }
  }
}
