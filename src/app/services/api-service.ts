import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { T101Request, T101Response } from '../models/t101';

@Injectable({
  providedIn: 'root',
})
export class ApiVService {
  private _baseUrl;

  constructor(private http: HttpClient) {
    this._baseUrl =
      'https://efristest.ura.go.ug/efrisws/ws/taapp/getInformation';
  }

  t101Command(command: T101Request): Observable<T101Response> {
    return this.http.post<T101Response>(`${this._baseUrl}`, command);
  }
}
