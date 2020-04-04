import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants} from '../../app/constants';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeListsService {
  constructor(private http: HttpClient) { }
  /**
    * Get data from the dummy restAPI
    * @returns Observable with the employee results
    */

  getEmployees(): Observable<any> {
    return this.http.get(constants.API_URL);
  }
}
