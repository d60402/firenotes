import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { SignupComponent } from './signup.component';
import { AuthService } from '../auth.service';

class AuthServiceStub {
  signup(email: string, password: string) { }
}

describe('SignupComponent.unit', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
			{ provide: AuthService, useClass: AuthServiceStub }
		]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a form with 3 fields', () => {
    expect(component.theForm.contains('email')).toBeTruthy();
    expect(component.theForm.contains('password')).toBeTruthy();
    expect(component.theForm.contains('password2')).toBeTruthy();
  });

  it('should make email field required', () => {
    const field = component.theForm.get('email');
    field.setValue('');
    expect(field.valid).toBeFalsy();
  });

  it('should ensure email address is valid', () => {
    const field = component.theForm.get('email');
    field.setValue('foo');
    expect(field.valid).toBeFalsy();
    field.setValue('me@mail.com');
    expect(field.valid).toBeTruthy();
  });

  it('should ensure minimum password length is met', () => {
    const field = component.theForm.get('password');
    field.setValue('pass');
    expect(field.valid).toBeFalsy();
    field.setValue('passwo');
    expect(field.valid).toBeTruthy();
  });

  it('should ensure password and confirmation password match', () => {
    component.theForm.get('password').setValue('pa$$w0rD!');
    component.theForm.get('password2').setValue('pa$$w0rD!');

    expect(component.matchesPassword((<FormControl>component.theForm.get('password2')))).toBeNull();

    component.theForm.get('password2').setValue('foobar1');

    expect(component.matchesPassword((<FormControl>component.theForm.get('password2')))).not.toBeNull();

  });

  // *** INTEGRATION TESTS ***

  it('should call AuthService.signup() when Submit button is clicked ', () => {
    const form = fixture.debugElement.query(By.css('form'));
	  const authService = fixture.debugElement.injector.get(AuthService);
    const spy = spyOn(authService, 'signup').and.returnValue(Promise.resolve());

    form.triggerEventHandler('submit', null);
	  
    expect(spy).toHaveBeenCalled();
  });

  // TODO Figure out how to test with firebase
  // it('should call auth service signup method when the form is submitted', async(() => {
  //   const authService = new AuthService();
    
  //   let spy = spyOn(authService, 'signup').and.callFake(() => {
  //     return new Promise((resolve, reject) => {});
  //   });

  //   component.onSubmit();

  //   expect(spy).toHaveBeenCalled();

  // }));
});
