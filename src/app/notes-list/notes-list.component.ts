import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Note } from '../model/note.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  notesSubscription: Subscription;
  userSubscription: Subscription;
  isLoading = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.getNotes()
      .then(notesObservable => {
        this.notesSubscription = notesObservable.subscribe(notes => {
          this.notes = notes;
          this.isLoading = false;
        });        
      });    
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
    if (this.notesSubscription) this.notesSubscription.unsubscribe();
  }
}
