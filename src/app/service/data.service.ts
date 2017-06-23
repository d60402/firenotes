import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Note } from '../model/note.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService{

  static readonly URL = environment.firebaseConfig.databaseURL;
  notes: FirebaseListObservable<Note[]>;  

  constructor(
    private authService: AuthService, 
    private afDb: AngularFireDatabase) { }

  getNotes(): Promise<FirebaseListObservable<Note[]>> {
    return new Promise((resolve, reject) => {
      this.authService.user.subscribe(user => {
        if (user) {
          const uid = this.authService.getUserId();
          this.notes = this.afDb.list('/users/' + uid + '/notes') as FirebaseListObservable<Note[]>;
          resolve(this.notes);
        }
      });
    });
  }

  getNote(id: string): FirebaseObjectObservable<Note> {
    const uid = this.authService.getUserId();
    return this.afDb.object('/users/' + uid + '/notes/' + id) as FirebaseObjectObservable<Note>;
  }

  addNote(note) {
    return this.notes.push(note);
  }

  updateNote(note) {
    return this.notes.update(note.$key, note);
  }

  deleteNote(id) {
    return this.notes.remove(id);
  }
}
