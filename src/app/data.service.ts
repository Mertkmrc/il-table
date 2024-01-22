import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ilDto {
  id: number;
  name: string;
}
interface ilceDto {
  id: number;
  name: string;
  il_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private http: HttpClient
  ) { }
  readIlData() {
    return this.http.get<ilDto[]>("../assets/iller.txt")
  }

  readIlceData() {
    return this.http.get<ilceDto[]>("../assets/ilceler.txt")
  }

}
