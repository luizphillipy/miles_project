import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoyaltyProgramDataService } from '../loyalty-program-data.service';
import { LoyaltyProgram } from '../loyalty-programs/loyalty-programs.component';

@Component({
  selector: 'app-edit-loyalty-program-page',
  templateUrl: './edit-loyalty-program-page.component.html',
  styleUrls: ['./edit-loyalty-program-page.component.css']
})
export class EditLoyaltyProgramPageComponent implements OnInit {
  editForm:FormGroup;
  loyaltyProgram!:LoyaltyProgram;
  saveSucessMessage:string="Loyalty Program data was sucessfully updated!";
  savedData:boolean=false;
  loyaltyProgramName!:string;
  travelerId!:string;
  constructor(private formBuilder:FormBuilder, private loyaltyProgramService: LoyaltyProgramDataService, private route:ActivatedRoute ) {
    this.editForm=formBuilder.group({
      name: new FormControl(),
      memberId: new FormControl(),
      milesAmount: new FormControl()
    });
   }

  ngOnInit(): void {
     this.travelerId=this.route.snapshot.params["travelerId"];
    const loyaltyProgramId=this.route.snapshot.params["loyaltyprogramId"];
    this.loyaltyProgramService.getOneLoyaltyProgram(this.travelerId,loyaltyProgramId).subscribe(loyaltyProgram=>{
        this.editForm.patchValue(loyaltyProgram);
        
    
    });
  }

  edit():void{
    const travelerId=this.route.snapshot.params["travelerId"];
    const loyaltyProgramId=this.route.snapshot.params["loyaltyprogramId"];
    console.log(this.editForm.value);
    
    this.loyaltyProgramService.updateOneLoyaltyProgram(this.editForm.value, travelerId,loyaltyProgramId).subscribe(updatedLoyaltyprogram=>{
      console.log(updatedLoyaltyprogram);
      this.savedData=true;

      
    });
    //this.reloadData();

  }
// reloadData():void{
//   const travelerId=this.route.snapshot.params["travelerId"];
//   const loyaltyProgramId=this.route.snapshot.params["loyaltyprogramId"];
//   this.loyaltyProgramService.getOneLoyaltyProgram(travelerId,loyaltyProgramId).subscribe(loyaltyProgram=>{
//       this.editForm.patchValue(loyaltyProgram);
      
  
//   });

// }
}
