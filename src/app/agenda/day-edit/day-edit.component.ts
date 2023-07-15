import { Component, Input } from '@angular/core';
import { Study } from 'src/app/study/study.model';
import { AgendaService } from '../agenda.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-day-edit',
  templateUrl: './day-edit.component.html',
  styleUrls: ['./day-edit.component.css']
})
export class DayEditComponent {
  @Input() dayName!:string;
  newStudy = new Study('','','');
  allowAddStudy = true;
  

  constructor(private agendaService:AgendaService){}

  onStudyAdded(f: NgForm){
    let value = f.value;
    let newStudy = new Study('0',value.name,value.time);
    let origin = 'created'
    this.agendaService.addStudy(this.dayName, newStudy, origin)
    f.reset();
  }
  onCancel(){
    this.allowAddStudy=false
    this.agendaService.cancelForm.next(this.allowAddStudy)
  }

}
