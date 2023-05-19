import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = "http://localhost:3000/clientes";
  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  save(client: Client): Observable<Client>{
  return this.http.post<Client>(this.url, client);
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.url}/${client.id}`, client);
    }

  delete(client: Client): Observable<void>{
    return this.http.delete<void>(`${this.url}/${client.id}`);
    }
}
