import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekComponent } from './agenda/week/week.component';
import { AgendaComponent } from './agenda/agenda.component';
import { StudyComponent } from './study/study.component';
import { RecordComponent } from './record/record.component';

const routes: Routes = [
  {path:'', component: AgendaComponent},
  {path:'study', component: StudyComponent},
  {path:'agenda', component: AgendaComponent},
  {path:'record', component: RecordComponent},
  {path:'study/:day', component: StudyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
