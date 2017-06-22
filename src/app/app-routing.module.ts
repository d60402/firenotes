import { NgModule } from '@angular/core';
import { Route, RouterModule, PreloadAllModules } from '@angular/router';

import { NotesListComponent } from './notes-list/notes-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { AboutComponent } from './about/about.component';


const routes: Route[] = [
	{ path: '', component: NotesListComponent, canActivate: [AuthGuard] },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent},
	{ path: 'note', component: NoteDetailComponent, canActivate: [AuthGuard] },
	{ path: 'note/:id', component: NoteDetailComponent, canActivate: [AuthGuard] },
	{ path: 'about', component: AboutComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}