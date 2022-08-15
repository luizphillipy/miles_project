import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyProgram } from './loyalty-programs/loyalty-programs.component';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyProgramDataService {
  #baseUrl: string="http://localhost:3002/api/";

  constructor(private http:HttpClient) { }

  public getLoyaltyPrograms(offset:number,travelerId: string):Observable<LoyaltyProgram[]>{
    console.log("get Loyalty Programs service requested");
    
    const url:string=this.#baseUrl+"travellers/"+travelerId+"/loyaltyprograms";
    console.log(url);
    
    return this.http.get<LoyaltyProgram[]>(url);
    
  }
  public getOneLoyaltyProgram(travelerId:string,loyaltyprogramId:string):Observable<LoyaltyProgram>{
    console.log("Get one Loyalty Program service requested ");
    console.log(loyaltyprogramId);
    
    const url:string=this.#baseUrl+"travellers/"+travelerId+"/loyaltyprograms/"+loyaltyprogramId;
    console.log(url);
    
    return this.http.get<LoyaltyProgram>(url);
  }
  public updateOneLoyaltyProgram( loyaltyProgram:LoyaltyProgram, travelerId:string,loyaltyprogramId:string):Observable<LoyaltyProgram>{
    console.log("UpdateOne Loyalty Program service requested");
    const url:string=this.#baseUrl+"travellers/"+travelerId+"/loyaltyprograms/"+loyaltyprogramId
    return this.http.put<LoyaltyProgram>(url, loyaltyProgram);
    

  }
  public createOneLoyaltyProgram( loyaltyProgram:LoyaltyProgram, travelerId:string):Observable<LoyaltyProgram>{
    console.log("Create Loyalty Program service requested");
    const url:string=this.#baseUrl+"travellers/"+travelerId+"/loyaltyprograms/"
    return this.http.post<LoyaltyProgram>(url, loyaltyProgram);
    

  }
  public deleteOneLoyaltyProgram(travelerId:string,loyaltyprogramId:string):Observable<any>{
    console.log("Get one Loyalty Program service requested ");
    
    const url:string=this.#baseUrl+"travellers/"+travelerId+"/loyaltyprograms/"+loyaltyprogramId;
    console.log("url: ",url);
    
    return this.http.delete<any>(url);
  }
}
