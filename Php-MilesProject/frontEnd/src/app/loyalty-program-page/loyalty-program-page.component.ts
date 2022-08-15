import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoyaltyProgramDataService } from '../loyalty-program-data.service';
import { LoyaltyProgram } from '../loyalty-programs/loyalty-programs.component';

@Component({
  selector: 'app-loyalty-program-page',
  templateUrl: './loyalty-program-page.component.html',
  styleUrls: ['./loyalty-program-page.component.css']
})
export class LoyaltyProgramPageComponent implements OnInit {
  travelerId!:string;
  loyaltyProgramId!:string;
  loyaltyProgram!:LoyaltyProgram;
  deleteData:boolean=false;
  message:string="";


  constructor(private route:ActivatedRoute,private loyaltyProgramService:LoyaltyProgramDataService) { 
    this.loyaltyProgram=new LoyaltyProgram();
  }

  ngOnInit(): void {
    this.travelerId=this.route.snapshot.params["travelerId"];
    
    
    this.loyaltyProgramId=this.route.snapshot.params["loyaltyprogramId"];
    console.log(this.route.snapshot.params);
    this.loyaltyProgramService.getOneLoyaltyProgram(this.travelerId,this.loyaltyProgramId).subscribe({
      next:(loyaltyprogram)=>{
        console.log("loyalty program received",loyaltyprogram);
        this.loyaltyProgram=loyaltyprogram;
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
    


  }
  deleteLoyaltyProgram(){
    this.travelerId=this.route.snapshot.params["travelerId"];
    console.log(this.travelerId);
    
    this.loyaltyProgramId=this.route.snapshot.params["loyaltyprogramId"];
    console.log(this.loyaltyProgramId);
    
    this.loyaltyProgramService.deleteOneLoyaltyProgram(this.travelerId,this.loyaltyProgramId).subscribe({
      next:(deletedTraveler)=>{
        this.deleteData=true;
        console.log(deletedTraveler);
        this.message="Loyalty Program sucessfully deleted!"
        console.log(this.message);  
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
        this.deleteData=false; 
      }
      
    })

  }
}
