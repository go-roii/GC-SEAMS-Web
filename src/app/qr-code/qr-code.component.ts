import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QRCodeComponent implements OnInit {

  public myAngularxQrCode!: string

  constructor () {
    // assign a value
    this.myAngularxQrCode = 'the quick brown fox jumps over the lazy dog.';
  }

  ngOnInit(): void {
  }

}
