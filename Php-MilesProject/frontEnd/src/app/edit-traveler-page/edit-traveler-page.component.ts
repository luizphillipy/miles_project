import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TravelerServiceService } from '../traveler-service.service';

import { Traveler } from '../travelers/travelers.component';

@Component({
  selector: 'app-edit-traveler-page',
  templateUrl: './edit-traveler-page.component.html',
  styleUrls: ['./edit-traveler-page.component.css']
})
export class EditTravelerPageComponent implements OnInit {
  editForm:FormGroup;
  traveler!:Traveler;
  saveSucessMessage:string="Traveler data was sucessfully updated!";
  savedData:boolean=false;
  constructor(private formBuilder: FormBuilder,private travelerService: TravelerServiceService, private route: ActivatedRoute ) { 
    this.editForm=formBuilder.group({
      name: new FormControl(),
      nationality: new FormControl(),
      passport: new FormControl()
    });
  }
 
  ngOnInit(): void {
    const travelerId=this.route.snapshot.params["travelerId"];
    this.travelerService.getOneTraveler(travelerId).subscribe(traveler=>{
      this.editForm.patchValue(traveler);
    })

  }

  edit():void {

    console.log(this.editForm.value);
    const travelerId=this.route.snapshot.params["travelerId"];
    this.travelerService.updateOneTraveler(this.editForm.value,travelerId).subscribe(updatedTraveler=>{
      console.log(updatedTraveler);
      this.savedData=true;
    });
    

  }
}
