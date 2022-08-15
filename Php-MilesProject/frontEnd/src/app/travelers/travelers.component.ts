import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoyaltyProgram } from '../loyalty-programs/loyalty-programs.component';
import { TravelerServiceService } from '../traveler-service.service';


export class Traveler{
  #_id!:string;
  #name!:string;
  #passport!:string;
  #nationality!:string;
  #loyaltyPrograms!:[LoyaltyProgram];
  get _id(){return this.#_id};
  get name(){return this.#name};
  set name(name:string){this.#name=name};
  get passport(){return this.#passport};
  set passport(passaport:string){this.#passport=passaport};
  get nationality(){return this.#nationality};
  set nationality(nationality:string){this.#nationality=nationality};
  get loyaltyPrograms(){return this.#loyaltyPrograms};
  //set loyaltyPrograms(loyaltyProgram:[LoyaltyProgram]){this.#loyaltyPrograms=loyaltyProgram}
//  constructor(travelerId:string, name:string,passport:string, nationality:string ){
//    this.#_id=travelerId;
//    this.#name=name;
//    this.#passport=passport;
//    this.#nationality=nationality;
//  }
constructor(){}
fillForm(form:FormGroup) {
  this.#name=form.value.name;
  this.#nationality=form.value.nationality;
  this.#passport=form.value.passport;
  //this.traveler.credentials.username=form.value.email;
  //this.traveler.credentials.password=form.value.password;
}
json():any{
  return{
    name:this.#name,
    nationality:this.#nationality,
    passport:this.#passport
    // credentials:{
    //   username:this.traveler.credentials.username,
    //   password:this.traveler.credentials.password
    // }
  };
}
}
@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {

  travelers:Traveler[]=[];
  offset:number=0;

  constructor(private travelerService:TravelerServiceService) { }

  ngOnInit(): void {
    this.travelerService.getTravelers(this.offset).subscribe(travelers=>{
      this.travelers=travelers;
      console.log(travelers);
      

    })
  }
  previousPage():void {
    this.offset=this.offset-10
    this.travelerService.getTravelers(this.offset).subscribe(travelers=>{
      this.travelers=travelers;
      console.log(travelers);
    });

}
nextPage():void {
  this.offset=this.offset+10
    this.travelerService.getTravelers(this.offset).subscribe(travelers=>{
      this.travelers=travelers;
      console.log(travelers);
    });

}

}
