import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, interval } from "rxjs";
import { StudyService } from '../study.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  hour = 0;
  minute = 0;
  second = 0;
  intervalId!:any;
  subscription!:Subscription;
  stopped = false;
  resetOptions = false;
  started = true

  constructor(private studyService:StudyService){}

  ngOnInit(): void {
    if(!this.studyService.getTimer()){
      this.studyService.startCounter()
    }
    
    this.studyService.timerChangedEvent.subscribe((timer)=>{
      this.hour = timer[0];
      this.minute = timer[1];
      this.second = timer[2]
    })
    if (this.studyService.stopped){
      let timer = this.studyService.getTimer();
      this.hour = timer[0];
      this.minute = timer[1];
      this.second = timer[2]
    }
  }

  ngOnDestroy(): void {
    // clearInterval(this.intervalId);
    // this.subscription.unsubscribe()
  }

  // startCounter(){
  //   console.log('start!')
  //   this.intervalId = setInterval(()=>{
  //     if(this.second!=59){
  //       this.second++
  //     }else{
  //       if(this.minute!=59){
  //         this.minute++
  //       }else{
  //         if(this.second==59){
  //           this.minute=0
  //           this.hour++
  //         }
  //       }
        
  //       this.second=0
  //     }
  //     this.timer = [this.hour,this.minute,this.second]
  //     this.studyService.timerChangedEvent.next(this.timer)
  //   },1000)    
  // }

  onStop(){
    this.studyService.onStop()
    this.stopped=true
  }

  onContinue(){
    this.studyService.onContinue()
    this.stopped=false
  }

  onReset(){
    this.studyService.onReset();
    this.resetOptions=false
  }
  
}
