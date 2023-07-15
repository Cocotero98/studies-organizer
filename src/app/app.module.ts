import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './agenda/agenda.component';
import { WeekComponent } from './agenda/week/week.component';
import { DayComponent } from './agenda/day/day.component';
import { StudyComponent } from './study/study.component';
import { StudyItemComponent } from './study/study-item/study-item.component';
import { NotesComponent } from './study/notes/notes.component';
import { RecordComponent } from './record/record.component';
import { HeaderComponent } from './header.component';
import { StudyService } from './study/study.service';
import { TimerComponent } from './study/timer/timer.component';
import { DayEditComponent } from './agenda/day-edit/day-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    WeekComponent,
    DayComponent,
    StudyComponent,
    StudyItemComponent,
    NotesComponent,
    RecordComponent,
    HeaderComponent,
    TimerComponent,
    DayEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DndModule.forRoot(),
    HttpClientModule
  ],
  providers: [StudyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
