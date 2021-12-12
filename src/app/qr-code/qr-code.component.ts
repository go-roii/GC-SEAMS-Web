import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {QRCodeDetails} from "../models/QRCodeDetails";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})

export class QRCodeComponent implements OnInit {

  qrString!: string;
  private activeEventUUID!: Subscription;
  qrCodeDetails!: QRCodeDetails
  event_uuid!: string;
  attendance_code!: string;
  event_title!: string;

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activeEventUUID = this.route.params.subscribe(params => {

        this.attendance_code = params['attendance_code'];
        this.event_uuid = params['uuid'];
        this.event_title = params['event_title'];

    });

    this.qrCodeDetails = {
      event_uuid: this.event_uuid,
      attendance_code: this.attendance_code
    }

    this.qrString=JSON.stringify(this.qrCodeDetails)

    console.log(this.qrCodeDetails);
    console.log(JSON.parse(this.qrString))

  }

}
