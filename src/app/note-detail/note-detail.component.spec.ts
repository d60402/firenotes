import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { NoteDetailComponent } from './note-detail.component';
import { DataService } from '../service/data.service';
import { AuthService } from '../auth/auth.service';

class DataServiceStub {
  
}

class AuthServiceStub {
  
}

class ActivatedRouteStub {
  snapshot: ActivatedRouteSnapshotStub = new ActivatedRouteSnapshotStub()
}

class ActivatedRouteSnapshotStub {
  params = {}
}

describe('NoteDetailComponent', () => {
  let component: NoteDetailComponent;
  let fixture: ComponentFixture<NoteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteDetailComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule ],
      providers: [
        { provide: DataService, useClass: DataServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to false when adding a new note', () => {
    let router = TestBed.get(Router);
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    expect(component.isLoading).toBeFalsy();

  });

  it('should set isLoading to false after loading a note to be edited', fakeAsync(() => {
    let router = TestBed.get(Router);
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.snapshot.params = [42];

    tick();
    expect(component.isLoading).toBeFalsy();

  }));
});
