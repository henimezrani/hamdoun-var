import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase/app';
import { take, map, tap } from 'rxjs/operators';



export interface Roles { 
  delivery?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
/*interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}*/



@Injectable()
export class AuthService {

  user$: Observable<User>;
  userData:any;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ngZone:NgZone) {
      //// Get auth data, then get firestore user document || null
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData=user;
          this.user$=this.userData;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
  }

login(email,password) {
    
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        /*this.ngZone.run(() => {
          this.router.navigate(['/admin/dash']);
        });*/
        this.getUser(result.user).then(res=>{
          if(res.data().roles.admin)
          {
            localStorage.setItem('usertype', JSON.stringify(true));
          JSON.parse(localStorage.getItem('usertype'));
            this.router.navigate(['/admin/dash']);
          }else if(res.data().roles.delivery)
          {
            localStorage.setItem('usertype', JSON.stringify(false));
            JSON.parse(localStorage.getItem('usertype'));
            this.router.navigate(['/livreur/dash']);
          }
        })
       
       // this.updateUserDataAdmin(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })   
  }
 
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null  ? true : false;
  }
  SignUpAdmin(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.updateUserDataAdmin(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  SignUpDelivery(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
        this.updateUserDataDelievery(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }

  private  async getUser(user)
  {
    return await this.afs.doc(`users/${user.uid}`).ref.get();
    
  }
  private updateUserDataAdmin(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        admin: true
      }
    }
    return userRef.set(data, { merge: true })
  }
  private updateUserDataDelievery(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        delivery: true
      }
    }
    return userRef.set(data, { merge: true })
  }

  getUserType()
  {
    return JSON.parse(localStorage.getItem('usertype'));
  }
  


}