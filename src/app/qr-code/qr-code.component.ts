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
  validity!: string;
  attendance_part!: string;

  constructor (private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activeEventUUID = this.route.params.subscribe(params => {

        this.attendance_part = params['part'];
        this.event_uuid = params['uuid'];
        this.validity = params['validity'];

    });

    this.qrCodeDetails = {
      attendance_part: this.attendance_part,
      event_uuid: this.event_uuid,
      validity: this.validity
    }

    this.qrString=JSON.stringify(this.qrCodeDetails)

    console.log(this.qrCodeDetails);

  }

}
