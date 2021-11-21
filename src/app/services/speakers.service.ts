import { Injectable } from '@angular/core';
import {Speaker} from "../models/Speaker";
import {Departments} from "../models/Departments";

@Injectable({
  providedIn: 'root'
})

export class SpeakersService {

  private isLoaded: boolean=false;

  constructor() {
  }

  public set IsLoaded(value: boolean){
    this.isLoaded=value;
  }

  public get IsLoaded(){
    return this.isLoaded;
  }

  public setSpeakers(value: Speaker[]){
    sessionStorage.setItem('speakers', JSON.stringify(value));
    this.isLoaded=true;
  }

  public getSpeakers(){
    return JSON.parse(<string>sessionStorage.getItem('speakers'))
  }

  public updateSpeakers(speakers: string){
    sessionStorage.removeItem('speakers');
    sessionStorage.setItem('speakers', speakers);
  }

}
