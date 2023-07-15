import { Injectable, OnInit } from "@angular/core";
import { Study } from "../study/study.model";
import { StudyService } from "../study/study.service";
import { Subject, Subscribable, toArray } from "rxjs";
import { Day } from "./day/day.model";
import { MOCKSDAYS } from "../agenda/MOCKDAYS";
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn:"root"
})
export class AgendaService implements OnInit{
    daysChangedEvent = new Subject<Day>;
    allDaysChangedEvent = new Subject<Day[]>;
    allowAddStudy = false;
    today!:string;
    date = new Date()
    days!: Day[]
    cancelForm = new Subject<boolean>()
    studies!:Study[];

    constructor(private http:HttpClient){
      // this.days!:Day[];
    }

    ngOnInit(): void {
        console.log('inicia?')
        console.log(this.days)
        this.daysChangedEvent.subscribe((day)=>{
          let index = this.days.findIndex(d => d.name == day.name);
          console.log(day)
          this.days[index]=day
      })
    }

    defineDay(dayAsNumber:number){
        switch(dayAsNumber){
          case 0:
            this.today = 'Sunday'
            break
          case 1:
            this.today = 'Monday'
            break
          case 2:
            this.today = 'Tuesday'
            break
          case 3:
            this.today = 'Wednesday'
            break
          case 4:
            this.today = 'Thursday'
            break
          case 5:
            this.today = 'Friday'
            break
          case 6:
            this.today = 'Saturday'
            break            
        }
      }

      getCurrentDay(){
        let currentDay = this.date.getDay();
        this.defineDay(currentDay)
        return this.today;
      }

      addStudy(day: string, study: Study, origin:string){
        if(!day){return}
        let dayAndStudies = this.getDay(day);
        if(!dayAndStudies){return}
        dayAndStudies.studies.push(study)
        console.log(dayAndStudies)
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        // if(origin==='created'){
        //   let maxId = 0;
        //   let studyItem!:Study;
          
        //   console.log('created')
        //   this.http.post('http://localhost:3000/study',study, {headers: headers})
        //     .subscribe(()=>{
              
        //   })
          
        //   this.http.get<Study[]>('http://localhost:3000/study')
        //     .subscribe((studies:Study[])=>{
        //       this.studies = studies
        //       console.log(typeof(this.studies))
        //     })
        //     let length = this.studies.length
        //     console.log(this.studies[length])
        //     this.http.put('http://localhost:3000/days',study, {headers: headers})
        //       .subscribe(()=>{
                
        //       })
        // }
          this.http.put('http://localhost:3000/days',dayAndStudies, {headers: headers})
        .subscribe((v)=>{
          console.log(v)
        })
        
        
        
        this.daysChangedEvent.next(dayAndStudies)
      }
      
      getAllDays(){
        this.http.get<Day[]>('http://localhost:3000/days')
          .subscribe((days:Day[])=>{
            this.days = days
            console.log(days);
            this.allDaysChangedEvent.next(this.days)
          }, error=> {
            console.log(error);
        }
          )
          console.log(this.days)
        return this.days;
      }

      getDay(dayName:string){
        if(!dayName){return}
        let day = this.days[0];
        for(let d of this.days){
          if(d.name == dayName){  
            day = d
          }
        }
        return day;
    }

    getStudiesPerDay(dayName:string){
      let day = this.days[0];
      
      for(let d of this.days){
        if(d.name == dayName){
          day = d
        }
      }
      if (!day){
          return this.days[0].studies
      }else{
          return day.studies
      }
  }

    deleteStudyFromDay(dayName:string,study:Study){
      let day = this.getDay(dayName);
      if(!day){
        return
      }
      let index = day?.studies.indexOf(study);
      if(index==undefined){
        return
      }
      day?.studies.splice(index,1)
      this.daysChangedEvent.next(day)
      const headers =  new HttpHeaders({'Content-Type': 'application/json'});
      this.http.put('http://localhost:3000/days',day, {headers: headers})
        .subscribe(()=>{
          
        })
      
    }
}