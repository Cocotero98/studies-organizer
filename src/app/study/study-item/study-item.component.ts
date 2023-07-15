import { Component, Input, OnInit } from '@angular/core';
import { Study } from '../study.model';

@Component({
  selector: 'app-study-item',
  templateUrl: './study-item.component.html',
  styleUrls: ['./study-item.component.css']
})
export class StudyItemComponent implements OnInit{
  @Input()study!:Study;

  ngOnInit(): void {
    console.log('study item initialized')
  }
}
