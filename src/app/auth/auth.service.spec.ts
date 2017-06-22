import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

class AngularFireAuthStub {
  authState: Observable<any> = Observable.empty(); 
  auth: firebaseAuthStub;
}

class firebaseStub {
  auth() {}
}

class firebaseAuthStub {
  createUserWithEmailAndPassword() {}
  signInWithEmailAndPassword() {}
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				AuthService,
        { provide: AngularFireAuth, useClass: AngularFireAuthStub }
		]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

	it('should call Firebase createUserWithEmailAndPassword() when user signs up', inject([AuthService], (service: AuthService) => {

    const email = 'test@test.com';
    const pswd = 'password';

    const auth = new firebaseAuthStub();
    spyOn(firebase, 'auth').and.returnValue(auth);
    const spy = spyOn(auth, 'createUserWithEmailAndPassword');

    service.signup(email, pswd);

    expect(spy).toHaveBeenCalledWith(email, pswd);
	}));

  xit('should call AngularFire signInWithEmailAndPassword() when user logs in', inject([AuthService, AngularFireAuth], (service: AuthService, afAuth: AngularFireAuth) => {

    const email = 'test@test.com';
    const pswd = 'password';

    const spy = spyOn(afAuth.auth, 'signInWithEmailAndPassword');
    
    service.login(email, pswd);

    expect(spy).toHaveBeenCalledWith(email, pswd);
	}));
});
