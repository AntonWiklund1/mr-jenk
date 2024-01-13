// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private authUrl = environment.baseUrl; // Your API endp

    constructor(private http: HttpClient) {
      console.log(this.authUrl); // TODO: Why!
    }
    //get jwt token
    getJwtToken(username: string, password: string) {
        console.log("getJwtToken", username, password)  ;
        return this.http.post(this.authUrl, { username, password });
      }
      
}
