import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }  from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/auth.service';

class AuthServiceStub {
  logout() {}
  isAuthenticated() {}
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ HeaderComponent ],
        imports: [ RouterTestingModule ],
        providers: [
          { provide: AuthService, useClass: AuthServiceStub }
        ]
      })

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      authService = fixture.debugElement.injector.get(AuthService);
    });

  // *********************************
  // *** Unit tests...
  // *********************************
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService isAuthenticated() when isAuthenticated() is called', () => {
    authService = fixture.debugElement.injector.get(AuthService);
    const spy = spyOn(authService, 'isAuthenticated').and.callFake(() => {});

    component.isAuthenticated();

    expect(spy).toHaveBeenCalled();
  });

  it('should call AuthService logout() when onLogout() is called', () => {
    authService = fixture.debugElement.injector.get(AuthService);
    const spy = spyOn(authService, 'logout').and.callFake(() => {});

    component.onLogout();

    expect(spy).toHaveBeenCalled();
  });

  // *********************************
  // *** Template integration tests...
  // *********************************
  it ('should show appropriate links when the user is authenticated', () => {
    

  });








  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ HeaderComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HeaderComponent);
  //   component = fixture.componentInstance;
  //   authService = fixture.debugElement.injector.get(AuthService);
  //   fixture.detectChanges();
  // });


});
