import { Injectable, OnInit } from "@angular/core";
import { MOCKSDAYS } from "../agenda/MOCKDAYS";
import { Day } from "../agenda/day/day.model";
import { MOCKSTUDY } from "./MOCKSTUDY";
import { Study } from "./study.model";
import { AgendaService } from "../agenda/agenda.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn:'root'
})
export class StudyService implements OnInit{
    studies!: Study[];
    days!: Day[];
    day!:string;

    timer!:number[];
    hour = 0;
    minute = 0;
    second = 0;
    timerChangedEvent= new Subject<any>()
    stopped = false;
    intervalId!:any;

    constructor(private agendaService:AgendaService,
      private http: HttpClient
        ){
        this.studies = MOCKSTUDY;
        this.days = MOCKSDAYS;
    }

    ngOnInit(): void {
        console.log('init?')
        this.days = this.agendaService.getAllDays();
        
    }

    getStudies(){
        this.http.get<Study[]>('http://localhost:3000/study')
        .subscribe((studies:Study[])=>{
          this.studies = studies
        })
        return this.studies;
    }

    startCounter(){
        console.log('start!')
        this.intervalId = setInterval(()=>{
          if(this.second!=59){
            this.second++
          }else{
            if(this.minute!=59){
              this.minute++
            }else{
              if(this.second==59){
                this.minute=0
                this.hour++
              }
            }
            
            this.second=0
          }
          this.timer = [this.hour,this.minute,this.second]
          this.timerChangedEvent.next(this.timer)
        },1000)    
      }

      getTimer(){
        return this.timer;
      }
    
      onStop(){
        clearInterval(this.intervalId);
        this.stopped = true;
      }
    
      onContinue(){
        this.startCounter();
      }

      onReset(){
        clearInterval(this.intervalId)
        this.timer=[0,0,0]
        this.timerChangedEvent.next(this.timer)
      }
}