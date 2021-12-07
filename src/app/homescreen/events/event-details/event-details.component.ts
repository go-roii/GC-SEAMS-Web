import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

	@ViewChild("eventDetailsColumn") eventDetailsColumn?: ElementRef;
	attendanceColumnHeight!: number;

	enableEndQRCodeLink: boolean = true;

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

	ngAfterViewInit() {
		setTimeout(() => {
			this.attendanceColumnHeight = this.eventDetailsColumn?.nativeElement.clientHeight;
    }, 0);  
	}

	typingTimer: any;

	restrictEventDate(e: any) {
		clearTimeout(this.typingTimer);

		let currentDate = new Date().toISOString().split('T')[0]
		
		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
				e.target.value = e.target.value < currentDate ? null : e.target.value
			}, 1000);
		}
	}

	restrictEventTime(e: any) {
		clearTimeout(this.typingTimer);

		let hour = parseInt(e.target.value.split(":")[0]);

		// school hours 8am - 8pm ?
		if(e.target.value) {
			this.typingTimer = setTimeout(() => {
				e.target.value = hour >= 8 && hour <= 20 ? e.target.value : null
			}, 1000);
		}
	}

	onNativeChange(e: any) {
		this.enableEndQRCodeLink = e.target.checked
  }

  generateBeginQRCodeLink() {
    this.beginQRCodeLink = location.origin + '/qr-code' + this.qrCodeID
  }

  generateEndQRCodeLink() {
    this.endQRCodeLink = location.origin + '/qr-code' + this.qrCodeID
  }

}
