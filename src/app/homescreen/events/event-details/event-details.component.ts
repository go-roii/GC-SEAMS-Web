import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: [
    '../../homescreen.component.scss',
    './event-details.component.scss'
  ]
})
export class EventDetailsComponent implements OnInit {

  minDate: string =  new Date().toISOString().split('T')[0];
  beginQRCodeLink: string = '';
  endQRCodeLink: string = '';
  qrCodeID: string = '';

  eventForm: FormGroup=new FormGroup({
    eventName:new FormControl('',[Validators.required,]),
    eventDetails:new FormControl('',Validators.required,),
    eventDate:new FormControl('',[Validators.required,]),
    eventStartTime:new FormControl('',[Validators.required,]),
    eventEndTime:new FormControl('',[Validators.required,]),
    eventSpeakers:new FormControl('',[Validators.required,]),
    eventRegistrationForm:new FormControl('',[Validators.required])
  });

  speakerForm: FormGroup = new FormGroup({
    speakerName:new FormControl('',[Validators.required,]),
    speakerEmail:new FormControl('',[Validators.required,Validators.email]),
    speakerDescription:new FormControl('',[Validators.required,]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  generateBeginQRCodeLink() {
    this.beginQRCodeLink = location.origin + '/qr-code' + this.qrCodeID
  }

  generateEndQRCodeLink() {
    this.endQRCodeLink = location.origin + '/qr-code' + this.qrCodeID
  }

}
