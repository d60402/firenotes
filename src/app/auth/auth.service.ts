import { NgModule, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
@NgModule({})
export class AuthService {

	static readonly TOKEN_KEY = 'token';

	token: string;
	userId: string;
	user: Observable<firebase.User>;

	constructor(private afAuth: AngularFireAuth) {
		this.user = this.afAuth.authState;
		this.token = localStorage.getItem(AuthService.TOKEN_KEY);
		
		this.user.subscribe(user => {
			if (user != null) {
				this.userId = user.uid;
				user.getIdToken()
					.then(token => {
						localStorage.setItem(AuthService.TOKEN_KEY, token);
						this.token = token;
					});
			}
		});
	 }

	signup(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	login(email: string, password: string) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		const promise = this.afAuth.auth.signOut();

		return promise
			.then(() => {
				this.token = null;
				localStorage.removeItem(AuthService.TOKEN_KEY);
				this.userId = null;
			})
			.catch(error => alert(error));
	}

	isAuthenticated() {
		return this.token != null;
	}

	getToken() {
		return this.token;
	}

	getUserId() {
		return this.userId;
	}
}