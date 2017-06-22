import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

class AuthServiceStub {
  login(email, password) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear the error message when Login is clicked', () => {
    component.errorMessage = "Some error";

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.errorMessage).toBeNull();
  });

  xit('should set an error messsage when login fails', fakeAsync(() => {
    const ERROR_MESSAGE = 'Login failed!';
    const form = fixture.debugElement.query(By.css('form'));
	  const authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'login').and.returnValue(Promise.reject({message: ERROR_MESSAGE}));

    form.triggerEventHandler('submit', null);
	  fixture.detectChanges()

    tick();

    expect(component.errorMessage).toBe(ERROR_MESSAGE);
  }));

});
