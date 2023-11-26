import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.REST_API_SERVER
  constructor(private http: HttpClient) { }

  loginWithToken(credentials: { token: string}): Observable<any> {
    const body = {
      token: credentials.token,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl+'/api/loginWithToken', body, httpOptions)
      .pipe(
        map(response => {
          // Handle successful login responses here if needed
          return response;
        }),
        catchError(error => {
          // Handle errors here or throw the error to the component
          return throwError(error);
        })
      );
  }
  baseUrl = "https://api.themoviedb.org/3";
//https://api.themoviedb.org/3/search/movie?query=killing&include_adult=false&language=en-US&page=1
  searchMovies(query: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.api_key)
      .set('query', query)
      .set('language', 'en-US');

    return this.http.get<any>(`${this.baseUrl}/search/movie`, { params });
  }

  popularMovies(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.api_key)
      .set('language', 'en-US');

    return this.http.get<any>(`${this.baseUrl}/movie/popular`, { params });
  }

  topRatedMovies(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.api_key)
      .set('language', 'en-US');

    return this.http.get<any>(`${this.baseUrl}/movie/top_rated`, { params });
  }


}
