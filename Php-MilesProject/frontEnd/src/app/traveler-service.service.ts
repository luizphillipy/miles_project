import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Traveler } from './travelers/travelers.component';

@Injectable({
  providedIn: 'root'
})
export class TravelerServiceService {
  #baseUrl: string="http://localhost:3002/api/";


  constructor(private http:HttpClient) { }

  public getTravelers(offset:number):Observable<Traveler[]>{
    console.log("get travelers service requested");
    
    const url:string=this.#baseUrl+"travellers";
    return this.http.get<Traveler[]>(url);
    
  }
  public getOneTraveler(travelerId:string):Observable<Traveler>{
    console.log("Get one traveler service requested ");
    
    const url:string=this.#baseUrl+"travellers/"+travelerId;
    return this.http.get<Traveler>(url);
  }
  public updateOneTraveler( traveler:Traveler,travelerId:string):Observable<Traveler>{
    console.log("UpdateOne Traveler service requested");
    const url:string=this.#baseUrl+"travellers/"+travelerId;
    return this.http.put<Traveler>(url, traveler);
    

  }
  public createOneTraveler(traveler:Traveler):Observable<Traveler>{
    console.log("Create one Traveler Service Requested");
    const url:string=this.#baseUrl+"travellers";
    return this.http.post<Traveler>(url, traveler);
    
  }
  public deleteOneTraveler(travelerId:string):Observable<any>{
    console.log("Delete one Traveler Service Requested");
    const url:string=this.#baseUrl+"travellers/"+travelerId;
    return this.http.delete<any>(url);
    
  }
}
