import { TestBed, inject } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';

import { DataService } from './data.service';
import { AuthService } from '../auth/auth.service';

class AuthServiceStub {

}

class AngularFireDatabaseStub {}

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ 
        DataService,
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should have notes data set on init', () => {
    
  });
});
