import { Injectable } from '@angular/core';
import { iAuthorization } from '../interfaces/authorization.interface';
import { Observable } from 'rxjs';
import { iUser } from '../interfaces/user.interface';
import { iAuthentication } from '../interfaces/authentication.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public createNewAccount(user: iAuthentication): Observable<iAuthorization> {
        throw new Error('Method not implemented.');
    }
    public signInWithEmailAndPassword(email: string, password: string): Observable<iAuthorization> {
        throw new Error('Method not implemented.');
    }
    public validToken(content: iAuthorization): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public revokeToken(content: iAuthorization): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getCurrentToken(): Observable<iAuthorization> {
        throw new Error('Method not implemented.');
    }
    public isAuthenticated(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public isEmailAlreadyExists(content: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getCurrentUser(): Observable<iUser> {
        throw new Error('Method not implemented.');
    }
    public getUserByUID(uid: string): Observable<iUser | undefined> {
        throw new Error('Method not implemented.');
    }
    public forgotPassword(content: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public logout(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public refreshToken(content: iAuthorization): Observable<iAuthorization> {
        throw new Error('Method not implemented.');
    }
}