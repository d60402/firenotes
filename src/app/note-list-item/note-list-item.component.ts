import { Component, OnInit, Input } from '@angular/core';

import { Note } from '../model/note.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent {

  @Input() note: Note;

  constructor(private dataService: DataService) { }
}
