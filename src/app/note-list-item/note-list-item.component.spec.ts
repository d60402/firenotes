import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NoteListItemComponent } from './note-list-item.component';
import { Note } from '../model/note.model';

xdescribe('NoteListItemComponent', () => {
  let component: NoteListItemComponent;
  let fixture: ComponentFixture<NoteListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteListItemComponent ],
      imports: [ RouterTestingModule ],
      providers: [
				{ 
					provide: Router, 
					useClass: class { 
						navigate = jasmine.createSpy("navigate")
					}
				},
        { 
					provide: ActivatedRoute, 
					useClass: class { }
				}
		]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteListItemComponent);
    component = fixture.componentInstance;
    component.note = new Note('Note Title', 'Note content');
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
