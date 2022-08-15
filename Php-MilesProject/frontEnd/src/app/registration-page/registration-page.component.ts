import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TravelerServiceService } from '../traveler-service.service';
import { Traveler } from '../travelers/travelers.component';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm:FormGroup;
  traveler!:Traveler;
  saveSucessMessage!:string;
  errorMessage!:string;
  savedData:boolean=false;

  constructor(private formBuilder: FormBuilder,private travelerService: TravelerServiceService, private route: ActivatedRoute ) { 
    this.registrationForm=formBuilder.group({
      name:"",
      nationality: "",
      passport: "",
      email: "",
      password: ""
    });
  }


  ngOnInit(): void {

  }
  register():void{
    
    const newTraveler:Traveler=new Traveler();
    newTraveler.fillForm(this.registrationForm);
    this.travelerService.createOneTraveler(newTraveler.json()).subscribe({
      next:(savedTraveler)=>{
        this.saveSucessMessage="Traveler was sucessfully created!";
        this.savedData=true;
        console.log(this.saveSucessMessage);
        
      },
      error:()=>{
        this.errorMessage="Error Saving Traveller";
        this.savedData=false;
      }
    });
    

  }
 
}
