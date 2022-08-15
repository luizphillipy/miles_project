import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoyaltyProgramDataService } from '../loyalty-program-data.service';
import { LoyaltyProgram } from '../loyalty-programs/loyalty-programs.component';
import { Traveler } from '../travelers/travelers.component';

@Component({
  selector: 'app-create-loyalty-program-page',
  templateUrl: './create-loyalty-program-page.component.html',
  styleUrls: ['./create-loyalty-program-page.component.css']
})
export class CreateLoyaltyProgramPageComponent implements OnInit {
  addForm:FormGroup;
  traveler!:Traveler;
  loyaltyProgram!:LoyaltyProgram;
  saveSucessMessage!:string;
  errorMessage!:string;
  savedData:boolean=false;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute, private loyaltyProgramService: LoyaltyProgramDataService) {
    this.addForm=formBuilder.group({
      name:"",
      memberId: "",
      milesAmount: ""
    });
   }

  ngOnInit(): void {
  }

  save():void{
    const newLoyaltyProgram:LoyaltyProgram = new LoyaltyProgram();
    newLoyaltyProgram.fillForm(this.addForm);
    const travelerId=this.route.snapshot.params["travelerId"];
    this.loyaltyProgramService.createOneLoyaltyProgram(newLoyaltyProgram.json(),travelerId).subscribe({
      next:(createdLoyaltyProgram)=>{
        this.saveSucessMessage="Loyalty Program sucessfuly Created!"
        this.savedData=true;
        console.log(this.saveSucessMessage);
        window.location.reload();
        
      },
      error:(err)=>{
        this.errorMessage="Error creating Loyalty Program",err;
        this.savedData=false;
        console.log(this.errorMessage);
        
      }
    });

  }

}

// this.travelerService.createOneTraveler(newTraveler.json()).subscribe({
//   next:(savedTraveler)=>{
//     this.saveSucessMessage="Traveler was sucessfully created!";
//     this.savedData=true;
//     console.log(this.saveSucessMessage);
    
//   },
//   error:()=>{
//     this.errorMessage="Error Saving Traveller";
//     this.savedData=false;
//   }
// });
