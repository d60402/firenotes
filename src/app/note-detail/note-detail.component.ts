import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2/database'
import { Subscription } from 'rxjs/Subscription';

import { Note } from '../model/note.model';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {

  note: Note;
  subscription: Subscription;
  theForm: FormGroup;
  errorMessage: string;
  isLoading = true;

  constructor(
    private dataService: DataService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];

    this.theForm = new FormGroup({
      'title': new FormControl(''),
      'content': new FormControl('')
    });

    if (id != null) { // Edit Note
      this.subscription = this.dataService.getNote(id)
        .subscribe(note => {
          this.note = note;
          this.theForm.get('title').setValue(note.title);
          this.theForm.get('content').setValue(note.content);
          this.isLoading = false;
        });
    }
    else { // Add Note
      this.isLoading = false;
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onSubmit() {

    const title = this.theForm.get('title').value;
    const content = this.theForm.get('content').value;

    if (this.note != null)
    {
      this.note.title = title;
      this.note.content = content;
      this.note.updateDate = new Date().toJSON();
      this.dataService.updateNote(this.note)
      .then(() => this.router.navigate(['']))
      .catch(error => {
        console.log(error);
        //TODO display error
      });
    } else {
      const note = new Note(content, title);

     this.dataService.addNote(note)
      .then((d) => {
        console.log(d);
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log(error);
        //TODO display error
      }); 
    }
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this note?')) {
      this.dataService.deleteNote(this.note.$key)
        .then(d=>this.router.navigate(['../']))
        .catch( error => {
          console.log(error);
          //TODO display error
        });
    }
  }
}
