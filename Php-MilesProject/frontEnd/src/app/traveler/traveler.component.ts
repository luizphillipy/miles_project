import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelerServiceService } from '../traveler-service.service';
import { Traveler } from '../travelers/travelers.component';

@Component({
  selector: 'app-traveler',
  templateUrl: './traveler.component.html',
  styleUrls: ['./traveler.component.css']
})
export class TravelerComponent implements OnInit {
  traveler!:Traveler;
  travelerId!:string;
  deleteSucessMessage!:string;
  errorMessage!:string;
  deleteData:boolean=false;

 

  constructor(private route:ActivatedRoute, private travelerService: TravelerServiceService) { 
    this.traveler=new Traveler();
  }

  ngOnInit(): void {
    this.travelerId=this.route.snapshot.params["travelerId"];
    this.travelerService.getOneTraveler(this.travelerId).subscribe({
      next:(traveler)=>{
        this.traveler=traveler;
        console.log(traveler);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
  }
  deleteTraveler():void{
    this.travelerId=this.route.snapshot.params["travelerId"];
    this.travelerService.deleteOneTraveler(this.travelerId).subscribe({
      next:(deletedTraveler)=>{
        this.deleteData=true;
        console.log(deletedTraveler);
        this.deleteSucessMessage="Traveler sucessfully deleted!"
        console.log(this.deleteSucessMessage);  
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
        this.deleteData=false;
        
        
        
      }
      
    })

  }
}
