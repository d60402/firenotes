import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterTestingModule }  from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';

class AuthServiceStub {

}

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule], 
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent,
  //       HeaderComponent
  //     ],
  //     imports: [
  //       RouterTestingModule.withRoutes([
	//         { path: '', component: AppComponent }
  //       ])
  //     ],
  //     providers: [AuthService]
  //   }).compileComponents();
  // }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have 'Firenotes' as title`, async(() => {
    expect(component.title).toEqual('Firenotes');
  }));

  xit('should initialize firebase', () => {
    const fb = fixture.debugElement.injector.get(firebase);

    const spy = spyOn(firebase, 'initializeApp').and.callFake(({}) => {});

    component.ngOnInit();
    
    expect(spy).toHaveBeenCalled();
  });

});
