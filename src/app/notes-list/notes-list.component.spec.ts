import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Note } from '../model/note.model';
import { NotesListComponent } from './notes-list.component';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth/auth.service';

class AuthServiceStub {

}

class DataServiceStub {
  getNotes() { return Promise.resolve() }
}

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesListComponent ],
      providers: [
        { provide: DataService, useClass: DataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
