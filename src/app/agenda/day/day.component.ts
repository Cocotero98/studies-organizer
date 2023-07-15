import { Component, Input, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Study } from 'src/app/study/study.model';
import { StudyService } from 'src/app/study/study.service';
// import { NgForm } from '@angular/forms';
import { Day } from './day.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit{
  @Input()day!:Day;
  allowAddStudy = false;
  study!:Study[];
  dayName!:string;
  // newStudy = new Study('','');
  studyRoute!:string;
  hovered=true;
  

  constructor(private agendaService:AgendaService, private studyService: StudyService){}

  ngOnInit(): void {
    this.dayName = this.day.name;
    this.study = this.agendaService.getStudiesPerDay(this.dayName);
    this.studyRoute='../study/'+this.dayName;
    this.agendaService.cancelForm.subscribe((boolean)=>{
      this.allowAddStudy=boolean
    })
    // console.log(this.study)
  }

  addToDay($event: any){
    const selectedItem:Study = $event.dragData.studyItem;
    console.log($event.dragData.dayName)
    let origin = 'moved'
    this.agendaService.addStudy(this.dayName,selectedItem, origin);
    this.agendaService.deleteStudyFromDay($event.dragData.dayName,selectedItem)
  }

  onStudyDeleted(studyItem:Study){
    this.agendaService.deleteStudyFromDay(this.dayName,studyItem)
  }
  // onStudyAdded(f: NgForm){
  //   let value = f.value;
  //   console.log(value.name)
  //   let newStudy = new Study(value.name,value.time);
  //   this.agendaService.addStudy(this.dayName, newStudy)
  //   f.reset();
  // }

}
