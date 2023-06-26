import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieBookingService {

  private url = "http://localhost:8400";
  constructor(private http:HttpClient) { }

  login(credentials:any){
    return this.http.post(`${this.url}/login`, credentials, {responseType:'text'});
  }

  registerUser(user: any): Observable<Object>{
    return this.http.post(`${this.url}/register`, user, {responseType:'text'});
  }

  forgetPassword(credentials:any): Observable<Object>{
    return this.http.post(`${this.url}/forgotPassword`, credentials, {responseType:"text"});
  }

  getAllMovies(): Observable<Object>{
    return this.http.get(`${this.url}/all`);
  }

  bookTickets(ticket: any): Observable<Object>{
    return this.http.post(`${this.url}/bookTickets`, ticket,{responseType:"text"});
  }

  addMovie(movie: any): Observable<Object>{
    return this.http.post(`${this.url}/movie/add`, movie, {responseType:'text'});
  }

  searchMovie(query:any): Observable<Object>{
    return this.http.get(`${this.url}/movies/search/${query}`);
  }

  deleteMovie(movieName:any, thatreName:any){
    return this.http.delete(`${this.url}/${movieName}/delete/${thatreName}`, {responseType:'text'});
  }
}