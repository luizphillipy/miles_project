import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoyaltyProgramDataService } from '../loyalty-program-data.service';
export class LoyaltyProgram{
  #_id!:string;
  #name!:string;
  #memberId!:string;
  #milesAmount!:number;
  get _id(){return this.#_id}
  get name(){return this.#name};
  set name(name:string){this.#name=name};
  get memberId(){return this.#memberId};
  set memberId(memberId:string){this.#memberId=memberId};
  get milesAmount(){return this.#milesAmount};
  set milesAmount(milesAmount:number){this.#milesAmount=milesAmount}
// constructor(_id:string, name:string, memberId:string, milesAmount:number){
//   this.#_id=_id;
//   this.#name=name;
//   this.#memberId=memberId;
//   this.#milesAmount=milesAmount;
// }
constructor(){

}
fillForm(form:FormGroup) {
  this.#name=form.value.name;
  this.#memberId=form.value.memberId;
  this.#milesAmount=form.value.milesAmount;
  //this.traveler.credentials.username=form.value.email;
  //this.traveler.credentials.password=form.value.password;
}
json():any{
  return{
    name:this.#name,
    memberId:this.#memberId,
    milesAmount:this.#milesAmount
    // credentials:{
    //   username:this.traveler.credentials.username,
    //   password:this.traveler.credentials.password
    // }
  };
}
}
@Component({
  selector: 'app-loyalty-programs',
  templateUrl: './loyalty-programs.component.html',
  styleUrls: ['./loyalty-programs.component.css']
})
export class LoyaltyProgramsComponent implements OnInit {

  loyaltyPrograms:LoyaltyProgram[]=[];
  offset:number=0;
  travelerId!:string;

  constructor(private loyaltyProgramService: LoyaltyProgramDataService, private route:ActivatedRoute) {

   }

   ngOnInit(): void {
    this.travelerId=this.route.snapshot.params["travelerId"];
    this.loyaltyProgramService.getLoyaltyPrograms(this.offset, this.travelerId).subscribe(loyaltyPrograms=>{
      this.loyaltyPrograms=loyaltyPrograms;
      console.log(loyaltyPrograms);
    });
  }
  previousPage():void {
    this.offset=this.offset-10
    const travelerId=this.route.snapshot.params["travelerId"];
    this.loyaltyProgramService.getLoyaltyPrograms(this.offset, travelerId).subscribe(loyaltyPrograms=>{
      this.loyaltyPrograms=loyaltyPrograms;
      console.log(loyaltyPrograms);
    });

}
nextPage():void {
  const travelerId=this.route.snapshot.params["travelerId"];
    this.loyaltyProgramService.getLoyaltyPrograms(this.offset, travelerId).subscribe(loyaltyPrograms=>{
      this.loyaltyPrograms=loyaltyPrograms;
      console.log(loyaltyPrograms);
    });
  }
  deleteLoyaltyProgram():void {
    
  }
}